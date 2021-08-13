const solanaWeb3 = require('@solana/web3.js');



(async () => {
    var connection = new solanaWeb3.Connection(
        solanaWeb3.clusterApiUrl('devnet'),
        'confirmed'
    )

    var wallet = solanaWeb3.Keypair.generate();
    var airdropSignature = await connection.requestAirdrop(
        wallet.publicKey,
        solanaWeb3.LAMPORTS_PER_SOL,
    );

//wait for airdrop confirmation
    await connection.confirmTransaction(airdropSignature);

// get account info
// account data is bytecode that needs to be deserialized
// serialization and deserialization is program specic
    let account = await connection.getAccountInfo(wallet.publicKey);
    console.log(account);
})()
