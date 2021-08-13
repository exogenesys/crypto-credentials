import solanaWeb3 from '@solana/web3.js'
import {Keypair, Transaction, SystemProgram, TransactionInstruction, PublicKey} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID, Token} from '@solana/spl-token';

import {startTransaction} from "./actions";

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
export const XEN_TOKEN_MINT_ADDRESS = new PublicKey("5FHxfkPfxg7FDpyUbyN9JhgeCMKjzyE6twMF5G14HhGo")



function xenToLamports(xen) {
    return xen * 100000000
}

async function isAccountFunded(wallet) {
    return (await PublicKey.findProgramAddress(
        [
            wallet.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            XEN_TOKEN_MINT_ADDRESS.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    ))[0];

}
export const doTransfer = async (dispatch, getState) => {
    dispatch(startTransaction())
    let state = getState()
    let { wallet, connection} = state.auth
    let { targetAddress, transferAmount } = state.transaction
    let feePayer = Keypair.fromSecretKey(new Uint8Array(Array.from(state.transaction.feePayer)))
    let associatedAccountSource = await isAccountFunded(wallet.publicKey)
    let associatedAccountReciever = await isAccountFunded(new PublicKey(targetAddress))
    console.log(associatedAccountSource.toBase58(), associatedAccountReciever.toBase58())
    if (associatedAccountSource) {
        // recipient address already has associated token account so
        // we can send tokens there
        console.log(wallet)
        let t = new Token(connection, XEN_TOKEN_MINT_ADDRESS, TOKEN_PROGRAM_ID, feePayer)

        let transactionInstruction = Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            associatedAccountSource,
            associatedAccountReciever,
            wallet.publicKey,
            [feePayer, {publicKey: wallet.publicKey}],
            transferAmount,

        )
        let transaction = new Transaction();
        transaction.feePayer = feePayer.publicKey;
        transaction.recentBlockhash = (
            await connection.getRecentBlockhash()
        ).blockhash;
        console.log("got blockhash adding transactionS")
        transaction.add(transactionInstruction)
        transaction.sign(feePayer)

        let signed = await wallet.signTransaction(transaction)
        console.log("Transaction signed")
        let signature = await connection.sendRawTransaction(signed.serialize());
        console.log('Submitted transaction ' + signature + ', awaiting confirmation');
        await connection.confirmTransaction(signature, 'singleGossip');
        console.log('Transaction ' + signature + ' confirmed');

    }
    else {
        // create an associated token account for recipient with sender funding
    }



}
