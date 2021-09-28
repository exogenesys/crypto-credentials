import { Connection } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { initProgram } from "./actions";
import config from "../../config";

/* ANCHOR */
import idl from "../../idl/crypto_credentials_program.idl.json";
/* ANCHOR */

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

export const initializeApp = async (dispatch, getState) => {
  initProgramFromIdl(dispatch, getState);
};
