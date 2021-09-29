import { toast } from "bulma-toast";

/* ANCHOR */
import * as anchor from "@project-serum/anchor";
import { requestAirdrop, getBalance } from "../solana/utils";
import config from "../../config";

import {
  updateBalance,
  loadUniversityData,
  setUniversityAccountStatus,
  updateAccountPollingStatus,
  incrementAccountPollingCount,
  resetAccountPollingCount,
  POLLING_STATUS,
} from "./actions";
/* ANCHOR */

export const requestAirdropAndNotify = async (dispatch, getState) => {
  const state = getState();
  const { wallet } = state.auth;
  const tx = await requestAirdrop(
    config[process.env.REACT_APP_CLUSTER].clursterUrl,
    wallet._publicKey,
    1
  );
  toast({
    message: tx.value.err == null ? "Airdrop Successful!" : "Airdrop failed",
    type: "is-info",
    duration: 2000,
    position: "bottom-left",
  });
};

export const fetchAndUpdateBalanceOfWallet = async (dispatch, getState) => {
  const state = getState();
  const { wallet } = state.auth;
  const balance = await getBalance(
    config[process.env.REACT_APP_CLUSTER].clursterUrl,
    wallet._publicKey
  );
  dispatch(updateBalance({ balance }));
};

export const findUniversityKey = async (dispatch, getState) => {
  const state = getState();
  const { program, randomSeed } = state.university;
  // const { provider } = state.university;
  const publicKey = state.auth.wallet._publicKey;

  const courseNumber = 3;
  const byteArray = new Uint8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    randomSeed + courseNumber,
  ]);

  const [universityKey, universityBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), byteArray],
      program.programId
    );

  return universityKey;
};

export const pollUniversityAccount = async (dispatch, getState) => {
  const state = getState();
  const { program, accountPollingCount } = state.university;
  try {
    const universityKey = await findUniversityKey(dispatch, getState);

    dispatch(
      updateAccountPollingStatus({
        status: POLLING_STATUS.WAITING,
      })
    );

    const universityProfile = await program.account.university.fetch(
      universityKey
    );

    dispatch(resetAccountPollingCount());

    dispatch(
      updateAccountPollingStatus({
        status: POLLING_STATUS.SUCCESS,
      })
    );
    console.log("university", universityProfile);
    console.log("university.name", universityProfile.name);
    console.log("university.authority", universityProfile.authority.toString());

    dispatch(
      loadUniversityData({
        profile: universityProfile,
        universityAccountKey: universityKey,
      })
    );
    dispatch(
      setUniversityAccountStatus({
        universityAccountStatus: true,
      })
    );
  } catch (error) {
    console.log(error);
    if (accountPollingCount < 10) {
      dispatch(incrementAccountPollingCount());

      dispatch(
        updateAccountPollingStatus({
          status: POLLING_STATUS.TRY_AGAIN,
        })
      );
      setTimeout(() => pollUniversityAccount(dispatch, getState), 2 * 1000);
    } else {
      dispatch(resetAccountPollingCount());

      dispatch(
        updateAccountPollingStatus({
          status: POLLING_STATUS.FAILED,
        })
      );

      dispatch(
        setUniversityAccountStatus({
          universityAccountStatus: false,
        })
      );
    }
  }
};

export const tryFetchUniversityAccountOnce = async (dispatch, getState) => {
  const state = getState();
  const { program } = state.university;
  try {
    const universityKey = await findUniversityKey(dispatch, getState);

    dispatch(
      updateAccountPollingStatus({
        status: POLLING_STATUS.WAITING,
      })
    );

    const universityProfile = await program.account.university.fetch(
      universityKey
    );

    dispatch(
      updateAccountPollingStatus({
        status: POLLING_STATUS.SUCCESS,
      })
    );
    console.log("university", universityProfile);
    console.log("university.name", universityProfile.name);
    console.log("university.authority", universityProfile.authority.toString());

    dispatch(
      loadUniversityData({
        profile: universityProfile,
        universityAccountKey: universityKey,
      })
    );
    dispatch(
      setUniversityAccountStatus({
        universityAccountStatus: true,
      })
    );
  } catch (error) {
    dispatch(
      updateAccountPollingStatus({
        status: POLLING_STATUS.FAILED,
      })
    );
  }
};

export const createUniversity = async (dispatch, getState) => {
  try {
    // dispatch(startTransaction());
    const state = getState();
    const { program, randomSeed } = state.university;
    const publicKey = state.auth.wallet._publicKey;
    console.log(state);
    if (
      !state.university.universityFormData ||
      !state.university.universityFormData.name
    ) {
      throw new Error("invalid form data");
    }
    const { name } = state.university.universityFormData;

    const courseNumber = 3;
    const byteArray = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      randomSeed + courseNumber,
    ]);

    const [universityKey, universityBump] =
      await anchor.web3.PublicKey.findProgramAddress(
        [publicKey.toBuffer(), byteArray],
        program.programId
      );

    console.log("universityKey", universityKey.toString());

    await program.rpc.createUniversity(
      name,
      new anchor.BN(randomSeed + courseNumber),
      universityBump,
      {
        accounts: {
          university: universityKey,
          authority: publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [],
      }
    );

    await pollUniversityAccount(dispatch, getState);
  } catch (error) {
    console.log(error);

    alert("some error occured");

    dispatch(
      setUniversityAccountStatus({
        universityAccountStatus: false,
      })
    );
  }
};

export const onUniversityLogin = async (dispatch, getState) => {
  tryFetchUniversityAccountOnce(dispatch, getState);
  fetchAndUpdateBalanceOfWallet(dispatch, getState);
};

export const createCredential = async (dispatch, getState) => {
  const state = getState();
  const { program } = state.university;
  const publicKey = state.auth.wallet._publicKey;
  const { newCredentialData } = state.university;

  const courseNumber = 3;
  const byteArray = new Uint8Array([0, 0, 0, 0, 0, 0, 0, courseNumber]);

  const [credentialKey, credentialBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), byteArray],
      program.programId
    );

  console.log("credentialKey", credentialKey.toString());

  const courseNameInput = "CS101";
  await program.rpc.createUniversity(
    newCredentialData.studentName,
    newCredentialData.studentPublicKey,
    newCredentialData.courseName,
    newCredentialData.graduationYear,
    new anchor.BN(courseNumber),
    credentialBump,
    {
      accounts: {
        university: universityKey,
        student: newCredentialData.studentPublicKey,
        authority: publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [],
    }
  );

  const university = await program.account.university.fetch(universityKey);
  console.log("university.name", university.name);
  console.log("universityNameInput", universityNameInput);
  console.log("university.authority", university.authority.toString());
};
