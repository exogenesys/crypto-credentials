import { clusterApiUrl, Connection } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolletWalletAdapter } from "@solana/wallet-adapter-sollet";
import { MathWalletWalletAdapter } from "@solana/wallet-adapter-mathwallet";
import {
  connectionError,
  connectionStart,
  connectionSuccess,
  disconnectStart,
  disconnectSuccess,
} from "./actions";

export async function startConnection(dispatch, getState) {
  dispatch(connectionStart());
  const state = getState();
  const network = clusterApiUrl("devnet");
  const connection = new Connection(network);
  let wallet;
  const { walletProvider } = state.auth;
  switch (walletProvider) {
    case "Sollet":
      try {
        wallet = new SolletWalletAdapter({
          network: WalletAdapterNetwork.Devnet,
        });
      } catch (e) {
        dispatch(connectionError(e));
        console.error(e);
      }
      break;
    case "Phantom":
      try {
        wallet = new PhantomWalletAdapter();
      } catch (e) {
        dispatch(connectionError(e));
        console.error(e);
      }
      break;
    case "Mathwallet":
      try {
        wallet = new MathWalletWalletAdapter();
      } catch (e) {
        dispatch(connectionError(e));
        console.error(e);
      }

      break;
    default:
      wallet = getPhantomWallet();
      break;
  }

  wallet.on("connect", (publicKey) => {
    console.log("connected");
    dispatch(
      connectionSuccess({
        publicKey,
        wallet,
        connection,
      })
    );
  });
  wallet.on("disconnect", () => {
    dispatch(disconnectStart());
    dispatch(disconnectSuccess());
  });

  wallet.on("error", (err) => {
    dispatch(connectionError(err));
  });

  try {
    await wallet.connect();
  } catch (err) {
    console.error(err);
    dispatch(connectionError(err));
  }
}
