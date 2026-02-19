const { ethers } = require("ethers");
const { executeTransaction } = require("./executor");
const config = require("./config");

const provider = new ethers.WebSocketProvider(config.wsRpc);
const jobs = new Map();

function addJob(job) {
  jobs.set(job.id, { ...job, executed: false });
}

async function checkGasAndExecute() {
  try {
    const feeData = await provider.getFeeData();
    const currentGas = Number(ethers.formatUnits(feeData.gasPrice, "gwei"));

    console.log("Current Gas:", currentGas, "gwei");

    for (const [id, job] of jobs.entries()) {
      if (!job.executed && currentGas <= job.maxGasPriceGwei) {
        await executeTransaction(job);
        job.executed = true;
        jobs.delete(id);
      }
    }
  } catch (err) {
    console.error("Gas check error:", err.message);
  }
}

setInterval(checkGasAndExecute, 5000);

module.exports = { addJob };
