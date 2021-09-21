import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import {
  addTxInfo,
  endTransaction,
  setError,
  startTransaction,
  updateBalance,
  initProgram,
  loadUniversityData,
} from "./actions";
import BN from "bn.js";
import { toast } from "bulma-toast";
import config from "../config";
import { requestAirdrop, getBalance } from "../solana/utils";

/*ANCHOR*/
import * as anchor from "@project-serum/anchor";
import { Provider } from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import idl from "../idl/CryptoCredentials.idl.json";
import { UNIVERSITY_ACCOUNT_PDA_SEED } from "../constants";
/*ANCHOR*/

export const requestAirdropAndNotify = async (dispatch, getState) => {
  const state = getState();
  const { wallet } = state.auth;
  const tx = await requestAirdrop(
    config.localnet.clursterUrl,
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
    config.localnet.clursterUrl,
    wallet._publicKey
  );
  dispatch(updateBalance({ balance }));
};

export const initProgramFromIdl = async (dispatch, getState) => {
  const state = getState();
  const { wallet } = state.auth;
  const connection = new Connection(config.localnet.clursterUrl);
  const provider = new anchor.Provider(connection, wallet, {
    preflightCommitment: "recent",
    commitment: "recent",
  });
  const programId = new anchor.web3.PublicKey(config.localnet.programId);
  const program = new anchor.Program(idl, programId, provider);
  dispatch(initProgram({ program, provider }));
};

export const createUniversity = async (dispatch, getState) => {
  dispatch(startTransaction());
  const state = getState();
  const program = state.university.program;
  const publicKey = state.auth.wallet._publicKey;

  const courseNumber = 3;
  const byteArray = new Uint8Array([0, 0, 0, 0, 0, 0, 0, courseNumber]);

  const [universityKey, universityBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), byteArray],
      program.programId
    );

  console.log("universityKey", universityKey.toString());

  const courseNameInput = "CS101";
  await program.rpc.createUniversity(
    courseNameInput,
    new anchor.BN(courseNumber),
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

  const university = await program.account.university.fetch(universityKey);
  console.log("university.name", university.name);
  console.log("universityNameInput", universityNameInput);
  console.log("university.authority", university.authority.toString());
  dispatch(endTransaction());
};

export const fetchUniveristyAccount = async (dispatch, getState) => {
  const state = getState();
  const program = state.university.program;
  const provider = state.university.provider;
  const publicKey = state.auth.wallet._publicKey;

  console.log(program, provider, publicKey);

  const courseNumber = 3;
  const byteArray = new Uint8Array([0, 0, 0, 0, 0, 0, 0, courseNumber]);

  const [universityKey, universityBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), byteArray],
      program.programId
    );

  const universityProfile = await program.account.university.fetch(
    universityKey
  );
  console.log("university", universityProfile);
  console.log("university.name", universityProfile.name);
  console.log("university.authority", universityProfile.authority.toString());
  dispatch(loadUniversityData({ profile: universityProfile }));
};

export const onUniversityLogin = async (dispatch, getState) => {
  fetchAndUpdateBalanceOfWallet(dispatch, getState);
  initProgramFromIdl(dispatch, getState).then(() => {
    fetchUniveristyAccount(dispatch, getState);
  });
};

export const createCredential = async (dispatch, getState) => {
  const state = getState();
  const program = state.university.program;
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
