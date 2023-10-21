/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import {Socket} from "socket.io-client";
import { nanoid } from 'nanoid'

interface AppProps {
  socket: Socket;
}

function App({socket}: AppProps) {
  
  const [inputRoom, setInputRoom] = useState<string>("");
  const navigate : NavigateFunction = useNavigate();

  const handleCreateRoom = (): void=>{
    const roomId = nanoid(8);
    socket.emit('room:join', {roomId , userId: socket.id});
    navigate(`/${roomId}`);
    
  }

  const hadnleJoinRoom = (roomId: string): void=>{
    socket.emit('room:join', {roomId , userId: socket.id});
    navigate(`/${roomId}`);

  }

  return ( 
    <>
    <div className="bg-slate-500">
      <button onClick={handleCreateRoom}>Create a room</button>
      <form onSubmit={()=>hadnleJoinRoom(inputRoom)}>
            <input type="text" value={inputRoom} placeholder="Enter the Room Id" onChange={e=> setInputRoom((e.target.value).trimStart())} />
            <button >Join Room</button>
        </form>
    </div>
    </>
  )
}

export default App
