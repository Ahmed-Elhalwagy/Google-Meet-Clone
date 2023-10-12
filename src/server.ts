import express from 'express'
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';
import {ExpressPeerServer} from 'peer';
import { Server } from "socket.io";

dotenv.config();
const app = express();

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server);

app.use(cors({
    'origin': '*',
    'preflightContinue': true
}));
app.use('/peerjs', peerServer);


export const chatSocket = new Server(server, {
    cors: {
      origin: process.env.FRONT_URL,
    }
});

chatSocket.on("connection", (socket)=>{
    console.log("a user connected");
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
})

const port = process.env.PORT || 5000
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)    
})

app.get('/', (req, res) => {
    res.send('Hello World')
});