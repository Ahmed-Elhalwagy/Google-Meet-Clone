import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';
import {ExpressPeerServer} from 'peer';
import {Server} from 'socket.io';
import { v4 as uuidV4 } from 'uuid';
import {nanoid} from 'nanoid';

dotenv.config();
const app = express();

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server);
let groups = [];


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
  return uuidV4();
}

io.on('connection', socket => {
   console.log("A user connected on sockek => ", socket.id);

   socket.on("disconnect", ()=>{
   console.log("disconnected user => ", socket.id);
   })

    socket.on('room:create', () => {
        let room = nanoid(8);
        // while(groups.includes(room)){
        //   room = nanoid();
        // }
        groups.push(room);
        socket.join(room)
        console.log('Room created => ', room);
        
        socket.emit('room:created', {room});
    })

    
    socket.on('room:join', ({roomId, userId}) => {
      if(!groups.includes(roomId)) return;
      
      socket.emit('room:joined', {roomId})        
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId)
      })
    })

    socket.on('chat message', (payload) => {
      
      io.to(payload.roomId).emit("chat message", payload);

      console.log(`${payload.userId} Sent ${payload.msg} to room ${payload.roomId}`);
    });  
  })
  

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)    
})

app.get('/room/:id', (req, res) => {

  
});