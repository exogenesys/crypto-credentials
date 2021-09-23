import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import BN from "bn.js";
import {
  addTxInfo,
  endTransaction,
  setError,
  startTransaction,
} from "./actions";

const apiUrl = "https://xen-token-server.herokuapp.com";

function bnToPubkey(bn) {
  const bigno = new BN(bn, 16);
  return new PublicKey(bigno.toArray());
}

/*
    Maps a plain javascript object to the Transaction class
    tx: the object that is mapped
 */
function parseTransaction(tx) {
  const txn = new Transaction(tx);
  txn.recentBlockhash = tx.recentBlockhash;
  txn.feePayer = bnToPubkey(tx.feePayer._bn);
  txn.instructions = [];
  for (const instruction of tx.instructions) {
    const keys = [];
    for (const key of instruction.keys) {
      keys.push({
        isSigner: key.isSigner,
        isWritable: key.isWritable,
        pubkey: bnToPubkey(key.pubkey._bn),
      });
    }
    txn.instructions.push(
      new TransactionInstruction({
        data: Uint8Array.from(instruction.data.data),
        keys,
        programId: bnToPubkey(instruction.programId._bn),
      })
    );
  }

  txn.signatures = [];
  for (const signature of tx.signatures) {
    const sgn =
      signature.signature == null
        ? null
        : Uint8Array.from(signature.signature.data);
    txn.signatures.push({
      signature: sgn,
      publicKey: bnToPubkey(signature.publicKey._bn),
    });
  }

  return txn;
}

export const doTransfer = async (dispatch, getState) => {
  dispatch(startTransaction());

  const state = getState();

  const { wallet } = state.auth;
  const { targetAddress, transferAmount } = state.transaction;
  try {
    const connection = new Connection("https://api.devnet.solana.com");

    /* Get a fee-payer signed transfer instruction with 1% token tax reduced from transfer amount
           Body: wallet = the senders address,
                 transferAmount = the amount of tokens to be transferred
                 targetAddress = the receiversAddress

           only works for transferring XEN tokens
        */
    const transaction = await fetch(`${apiUrl  }/api/signedTransfer`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wallet: wallet.publicKey.toBase58(),
        transferAmount,
        targetAddress,
        token: "XEN",
      }),
    });

    // initialize a transaction from the received object.
    const tx = await parseTransaction(await transaction.json());

    // sign the received transaction with our own keypair and send the transaction to a cluster.
    const signed = await wallet.signTransaction(tx);
    const signature = await connection.sendRawTransaction(signed.serialize());
    dispatch(addTxInfo({ "Signature Confirmed": "Success" }));
    dispatch(endTransaction({ signature }));
    console.log(signature);
  } catch (e) {
    dispatch(setError(e.message));
  }
};
