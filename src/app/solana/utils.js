import { Connection, PublicKey } from "@solana/web3.js";

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
