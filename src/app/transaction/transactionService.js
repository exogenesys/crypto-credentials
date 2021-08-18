import {Connection, PublicKey, Transaction, TransactionInstruction} from '@solana/web3.js'

import {addTxInfo, startTransaction} from "./actions";
import BN from "bn.js";

const apiUrl = "http://localhost:3000"

function bnToPubkey(bn) {
    let bigno = new BN(bn, 16);
    return new PublicKey(bigno.toArray())
}


/*
    Maps a plain javascript object to the Transaction class
    tx: the object that is mapped
 */
function parseTransaction(tx) {
    let txn = new Transaction(tx)
    txn.recentBlockhash = tx.recentBlockhash
    txn.feePayer = bnToPubkey(tx.feePayer._bn)
    txn.instructions = []
    for (let instruction of tx.instructions) {
        let keys = []
        for (let key of instruction.keys) {
            keys.push({
                isSigner: key.isSigner,
                isWritable: key.isWritable,
                pubkey: bnToPubkey(key.pubkey._bn)
            })
        }
        txn.instructions.push(
            new TransactionInstruction({
                data: Uint8Array.from(instruction.data.data),
                keys: keys,
                programId: bnToPubkey(instruction.programId._bn)

            })
        )
    }

    txn.signatures = []
    for (let signature of tx.signatures) {
        let sgn = signature.signature == null ? null : Uint8Array.from(signature.signature.data)
        txn.signatures.push({
            signature: sgn,
            publicKey: bnToPubkey(signature.publicKey._bn)
        })
    }

    return txn

}

export const doTransfer = async (dispatch, getState) => {
    dispatch(startTransaction())

    let state = getState()
    let {wallet} = state.auth
    let {targetAddress, transferAmount} = state.transaction
    try {
        let connection = new Connection("https://api.devnet.solana.com")
        dispatch(addTxInfo({"Connected To Cluster": connection.url, "Processing Request": "..."}))

        /* Get a fee-payer signed transfer instruction with 1% token tax reduced from transfer amount
           Body: wallet = the senders address,
                 transferAmount = the amount of tokens to be transferred
                 targetAddress = the receiversAddress

           only works for transferring XEN tokens
        */
        let transaction = await fetch(apiUrl + "/api/signedTransfer", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wallet: wallet.publicKey.toBase58(),
                transferAmount: transferAmount,
                targetAddress: targetAddress,
            })
        })

        // initialize a transaction from the received object.
        let tx = await parseTransaction(await transaction.json())

        // sign the received transaction with our own keypair and send the transaction to a cluster.
        let signed = await wallet.signTransaction(tx)
        console.log(signed)
        let signature = await connection.sendRawTransaction(signed.serialize());
        dispatch(addTxInfo({"Signature": signature, "Confirming Signature": "..."}))
        let confirmSignature = await connection.confirmTransaction(signature);
        dispatch(addTxInfo({"Signature Confirmed": "Success"}))
        console.log(signature)
    } catch (e) {
        dispatch(addTxInfo({"An Error Occured": e}))
    }


}
