import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

//const http = require('http');
import http from "http"
const server = http.createServer(app);
import { Server } from "socket.io";
app.use(cors());
// const { Server } = require("socket.io");
const io = new Server(server, {cors:{
  origin:"http://localhost:3000",
  methods: ["GET", "POST"],
}});




io.on("connection", (socket)=>{
  //console.log(`${socket.id}`)
  socket.on("room_no", (data)=>{
    socket.join(data)
  })

  socket.on("UserMessage", (data)=>{   
    socket.to(data.room).emit("resend", data);
  })
  // socket.on("UserMessage", (data)=>{   
  //   socket.broadcast.emit("resend", data);
  // })
})

server.listen(3001, ()=>{
  console.log("Running onf 3001")
})