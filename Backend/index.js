const express = require("express");
const { createServer } = require("http");
const { Server , } = require("socket.io");
const cors = require('cors')
const app = express();
app.use(cors())
const httpServer = createServer(app);
const io = new Server(httpServer, {cors:{
    origin: "http://localhost:3000"
}});

const messages = []

io.on("connection", (socket) => {
    console.log(`Socket conectado ${socket.id}`)
    socket.rooms()
    socket.emit('previousMessage', messages)
    console.log("Recebi a conexao")
    socket.on('sendMessage', (msg)=>{
        console.log("Recebi o evento")
        messages.push(msg)
        socket.broadcast.emit('receiveMessage', msg)
    })
    var clientNumber = io.sockets.adapter.rooms['room'].length
});

httpServer.listen(3001);

