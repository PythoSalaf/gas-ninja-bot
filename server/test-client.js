const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:5000");

ws.on("open", () => {
  console.log("Connected to backend");

  // Replace this with the private key of your embedded wallet from frontend
  const walletPrivateKey = "0xYOUR_EMBEDDED_WALLET_PRIVATE_KEY";

  ws.send(
    JSON.stringify({
      walletPrivateKey,
      to: "0x0000000000000000000000000000000000000000",
      value: "0.01",
      maxGasPriceGwei: 1,
    }),
  );
});

ws.on("message", (msg) => {
  console.log("Message from backend:", msg.toString());
});

ws.on("close", () => console.log("Connection closed"));
ws.on("error", (err) => console.error("WebSocket error:", err.message));
