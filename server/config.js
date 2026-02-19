require("dotenv").config();

module.exports = {
  // Optional: still keep for frontend login if needed
  privyAppId: process.env.PRIVY_APP_ID,
  privySecret: process.env.PRIVY_APP_SECRET,

  // RPC for ethers.js
  httpRpc: process.env.BSC_HTTP_RPC, // Example: "https://bsc-dataseed.binance.org/"
  wsRpc: process.env.BSC_WS_RPC, // Example: "wss://bsc-ws-node.nariox.org:443"

  port: process.env.PORT || 5000,
};
