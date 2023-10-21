import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';
import {ExpressPeerServer} from 'peer';
import {Server} from 'socket.io';
import { v4 as uuid } from 'uuid';

dotenv.config();
const app = express();

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server);

  const io = new Server(server,{
    cors: {
      origin: process.env.FRONT_URL,
    }
  });

app.use(cors({
    'origin': '*',
    'preflightContinue': true
}));

app.use('/peerjs', peerServer);

const port = process.env.PORT || 5000

io.engine.generateId = (req) => {
  return uuid();
}

io.on('connection', socket => {
    console.log("A user Connected on socket", socket.id);  
    
    socket.on('room:join', ({roomId, userId}) => {
      const rooms:string[] = [];
      

      if(!rooms.includes(roomId)){
        rooms.push(roomId);
      }

      console.log(`${userId} joined room ${roomId}`)


      socket.join(roomId)
      socket.to(roomId).emit('user-connected', userId)
      
      socket.on('chat message', (payload) => {
        io.to(payload.roomId).emit("chat message", payload);
  
        console.log(`${payload.userId} Sent ${payload.msg} to room ${payload.roomId}`);
      });  

      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId)
      })
    })
  })

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)    
})

app.get('/room/:id', (req, res) => {

  
});