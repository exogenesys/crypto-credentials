import {clusterApiUrl, Connection} from '@solana/web3.js';
import {connectionStart, connectionSuccess, disconnectStart, disconnectSuccess} from './actions'
import Wallet from "@project-serum/sol-wallet-adapter";

export async function startConnection(dispatch, getState) {
    dispatch(connectionStart())
    let network = clusterApiUrl('devnet')
    let connection = new Connection(network);
    let wallet
    if (window.solana !== void 0)
        wallet = new Wallet(window.solana, network)
    else {
        wallet = new Wallet(getState().auth.walletProviderUrl, network);
    }
    wallet.on('connect', publicKey => {
        dispatch(connectionSuccess({publicKey: publicKey, wallet: wallet, connection: connection}))
    });
    wallet.on('disconnect', () => {
        dispatch(disconnectStart())
        dispatch(disconnectSuccess())
    })
    await wallet.connect();
}