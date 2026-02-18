const http = require('http')
const {WebSocketServer}  =  require('ws')
const {ethers} = require('ethers')

const server = http.createServer()
const wss = new WebSocketServer({server})
const wssProvider = new ethers.WebSocketProvider("wss://bsc.drpc.org")
let Counter = 0

wss.on('connection',(connection,request) => {
    Counter++
    console.log("Client", Counter, "Connected")
    connection.send("welcome")

    connection.on('message',(e)=>{
        const String = e.toString()
        const data = JSON.parse(String)
    })
})

server.listen(5000,()=>{
    console.log("server start at port 5000")
})