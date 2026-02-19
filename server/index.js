// const http = require('http')
// const {WebSocketServer}  =  require('ws')
// const {ethers} = require('ethers')

// const server = http.createServer()
// const wss = new WebSocketServer({server})
// const wssProvider = new ethers.WebSocketProvider("wss://bsc.drpc.org")
// let Counter = 0

// wss.on('connection',(connection,request) => {
//     Counter++
//     console.log("Client", Counter, "Connected")
//     connection.send("welcome")

//     connection.on('message',(e)=>{
//         const String = e.toString()
//         const data = JSON.parse(String)
//     })
// })

// server.listen(5000,()=>{
//     console.log("server start at port 5000")
// })

const http = require("http");
const { WebSocketServer } = require("ws");
const crypto = require("crypto");
const { addJob } = require("./scheduler");
const config = require("./config");

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(JSON.stringify({ message: "Connected to scheduler" }));

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg.toString());

      if (
        !data.walletPrivateKey ||
        !data.to ||
        data.maxGasPriceGwei === undefined
      ) {
        return ws.send(JSON.stringify({ error: "Invalid payload" }));
      }

      const jobId = crypto.randomUUID();

      const job = {
        id: jobId,
        walletPrivateKey: data.walletPrivateKey,
        to: data.to,
        value: data.value || "0",
        data: data.data || "0x",
        maxGasPriceGwei: Number(data.maxGasPriceGwei),
      };

      addJob(job);

      ws.send(JSON.stringify({ status: "scheduled", jobId }));
    } catch (error) {
      ws.send(JSON.stringify({ error: "Invalid JSON" }));
    }
  });

  ws.on("close", () => console.log("Client disconnected"));
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
