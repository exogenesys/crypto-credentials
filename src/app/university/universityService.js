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
import { DEVNET_URL, PROGRAM_ID } from "../constants";
import { requestAirdrop, getBalance } from "../solana/utils";

/*ANCHOR*/
import * as anchor from "@project-serum/anchor";
import { Provider } from "@project-serum/anchor";
import * as web3 from "@solana/web3.js";
import idl from "../idl/CryptoCredentials.idl.json";
/*ANCHOR*/

export const requestAirdropAndNotify = async (dispatch, getState) => {
  const state = getState();
  const { wallet } = state.auth;
  const tx = await requestAirdrop(DEVNET_URL, wallet._publicKey, 1);
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
  const balance = await getBalance(DEVNET_URL, wallet._publicKey);
  dispatch(updateBalance({ balance }));
};

export const initProgramFromIdl = async (dispatch, getState) => {
  const state = getState();
  const { wallet } = state.auth;
  const connection = new Connection(DEVNET_URL);
  const provider = new anchor.Provider(connection, wallet, {
    preflightCommitment: "recent",
    commitment: "recent",
  });
  const programId = new anchor.web3.PublicKey(PROGRAM_ID);
  const program = new anchor.Program(idl, programId, provider);
  dispatch(initProgram({ program, provider }));
};
