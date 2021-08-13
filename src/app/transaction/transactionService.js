import {Keypair, PublicKey, Transaction} from '@solana/web3.js'
import {Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';

import {addTxInfo, startTransaction} from "./actions";

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
);
export const XEN_TOKEN_MINT_ADDRESS = new PublicKey("5FHxfkPfxg7FDpyUbyN9JhgeCMKjzyE6twMF5G14HhGo")



function xenToLamports(xen) {
    return xen * 1000000000
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
    let transferAmountLamports = xenToLamports(transferAmount)

    console.log(associatedAccountSource.toBase58(), associatedAccountReciever.toBase58())
    if (!associatedAccountSource) {
        // sender does not have an associated xen token account so stop transfer
        return
    }
    if (!associatedAccountReciever) {
        // create an associated account for the receiver
        let t = new Token(connection, XEN_TOKEN_MINT_ADDRESS, TOKEN_PROGRAM_ID, feePayer)

        associatedAccountReciever = await t.createAssociatedTokenAccount(targetAddress)
    }
    // recipient address already has associated token account so
    // we can send tokens there
    dispatch(addTxInfo({
        "Receiver's Account": associatedAccountReciever.toBase58(),
        "Sender's Account": associatedAccountSource.toBase58(),
        "Transfer Amount": transferAmount
    }))
    let taxCut = transferAmountLamports / 100
    let taxBurnInstruction = Token.createBurnInstruction(
        TOKEN_PROGRAM_ID,
        XEN_TOKEN_MINT_ADDRESS,
        associatedAccountSource,
        wallet.publicKey,
        [],
        taxCut
    )
    let transactionInstruction = Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        associatedAccountSource,
        associatedAccountReciever,
        wallet.publicKey,
        [feePayer, {publicKey: wallet.publicKey}],
        transferAmountLamports - taxCut,

    )
    let transaction = new Transaction();
    transaction.feePayer = feePayer.publicKey;
    transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
    ).blockhash;
    transaction.add(taxBurnInstruction)
    transaction.add(transactionInstruction)
    transaction.sign(feePayer)

    let signed = await wallet.signTransaction(transaction)
    let signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature, 'singleGossip');
    dispatch(addTxInfo({
        "Transaction Signature": signature,
        "Transaction Status": "Success"
    }))



}
