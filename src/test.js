const solanaWeb3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token")(async () => {
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet"),
    "confirmed"
  );

  console.log(account);
})();
