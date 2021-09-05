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

export const getBalanceOfWallet = async (dispatch, getState) => {
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

export const createCourse = async (dispatch, getState) => {
  dispatch(startTransaction);
  const state = getState();
  const program = state.university.program;
  const provider = state.university.provider;

  const publicKey = state.auth.wallet._publicKey;
  const collegeAuthority = anchor.web3.Keypair.generate();
  console.log("collegeAuthority", collegeAuthority.publicKey.toString());

  const [courseKey, courseBump] =
    await anchor.web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), Buffer.from(UNIVERSITY_ACCOUNT_PDA_SEED)],
      program.programId
    );
  console.log("courseKey", courseKey.toString());

  const courseNameInput = "CS101";
  await program.rpc.createCourse(
    courseNameInput,
    new anchor.BN(1),
    courseBump,
    {
      accounts: {
        course: courseKey,
        college: publicKey,
        authority: collegeAuthority.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [collegeAuthority],
    }
  );
  const course = await program.account.course.fetch(courseKey);
  console.log("course.name", course.name);
  console.log("courseNameInput", courseNameInput);
  console.log("course.authority", course.authority.toString());
  dispatch(endTransaction);
};

export const createCollege = async (dispatch, getState) => {
  dispatch(startTransaction);
  const state = getState();
  const program = state.university.program;
  const provider = state.university.provider;

  console.log(provider.wallet.payer);

  const publicKey = state.auth.wallet._publicKey;
  const collegeAuthority = anchor.web3.Keypair.generate();
  console.log("collegeAuthority", collegeAuthority.publicKey.toString());

  const boardName = "Oxford College";

  await program.rpc.createCollege(boardName, {
    accounts: {
      college: collegeAccount.publicKey,
      authority: collegeAuthority.publicKey,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    signers: [collegeAuthority],
    instructions: [
      await program.account.college.createInstruction(collegeAccount, 300),
    ],
  });

  const collegeFetched = await program.account.college.fetch(
    collegeAccount.publicKey
  );

  console.log("collegeFetched.name", collegeFetched.name.toString());
  console.log("collegeFetched.authority", collegeFetched.authority.toString());
  dispatch(endTransaction);
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
  dispatch(startTransaction());
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

  const university = await program.account.university.fetch(universityKey);
  console.log("university", university);
  console.log("university.name", university.name);
  console.log("university.authority", university.authority.toString());
  dispatch(endTransaction());
};
