import { Connection, PublicKey } from "@solana/web3.js";
import { CLUSTER_ENUMS } from "../../constants";
import { isValidString } from "../util";

export const requestAirdrop = async (networkUrl, publicKey, sol) => {
  const connection = new Connection(networkUrl);
  return await connection.confirmTransaction(
    await connection.requestAirdrop(publicKey, sol * 1000 * 1000 * 1000),
    "confirmed"
  );
};

export const getBalance = async (networkUrl, publicKey) => {
  const connection = new Connection(networkUrl);
  return await connection.getBalance(publicKey, "confirmed");
};

export const bnToPubkey = (bn) => {
  const bigno = new BN(bn, 16);
  return new PublicKey(bigno.toArray());
};

export const getBlockExplorerLink = (address) => {
  try {
    if (isValidString(address)) {
      let cluster = "";
      if (process.env.REACT_APP_CLUSTER === CLUSTER_ENUMS.localnet) {
        cluster = "custom&customUrl=http%3A%2F%2Flocalhost%3A8899";
      } else if (process.env.REACT_APP_CLUSTER === CLUSTER_ENUMS.devnet) {
        cluster = "devnet";
      } else if (process.env.REACT_APP_CLUSTER === CLUSTER_ENUMS.testnet) {
        cluster = "testnet";
      } else if (process.env.REACT_APP_CLUSTER === CLUSTER_ENUMS.mainnet) {
        cluster = "";
      } else {
        throw new Error("cluster is invalid");
      }
      return `https://explorer.solana.com/address/${address}?cluster=${cluster}`;
    }
    throw new Error("address is undefined");
  } catch (error) {
    return console.log(error);
  }
};
