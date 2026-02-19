const { ethers } = require("ethers");
const config = require("./config");

const provider = new ethers.JsonRpcProvider(config.httpRpc);

async function executeTransaction(job) {
  try {
    console.log("Executing job:", job.id);

    // Create wallet from private key
    const wallet = new ethers.Wallet(job.walletPrivateKey, provider);

    const tx = await wallet.sendTransaction({
      to: job.to,
      value: ethers.parseEther(job.value),
      data: job.data || "0x",
    });

    console.log("TX Sent:", tx.hash);
    await tx.wait();

    console.log("TX Confirmed:", tx.hash);
  } catch (err) {
    console.error("Execution failed:", err.message);
  }
}

module.exports = { executeTransaction };
