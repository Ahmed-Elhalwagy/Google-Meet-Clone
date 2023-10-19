import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';
import {ExpressPeerServer} from 'peer';
import {Server} from 'socket.io';
import { v4 as uuidV4 } from 'uuid';

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

io.on('connection', socket => {
    socket.on('CreateRoom', () => {
        socket.emit('RoomCreated', uuidV4());
    })

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
    
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).emit('user-connected', userId)
  
      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId)
      })
    })
  })

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)    
})

app.get('/', (req, res) => {
    res.send('Hello World')
});