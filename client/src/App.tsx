/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import {Socket} from "socket.io-client";

interface AppProps {
  socket: Socket;
}

function App({socket}: AppProps) {
  
  const [inputRoom, setInputRoom] = useState<string>("");
  const navigate : NavigateFunction = useNavigate();

  const handleCreateRoom = (): void=>{
    let roomId;
    socket.emit('room:create', { userId: socket.id});
    socket.on('room:created', ({room})=>{
      console.log(room);
      roomId = room
      navigate(`/${roomId}`);
    })
    
  }

  const hadnleJoinRoom = (e: { preventDefault: () => void; }, roomId: string): void=>{
    e.preventDefault();
    socket.emit('room:join', {roomId , userId: socket.id});

    socket.on('room:joined', ({roomId})=>{      
      navigate(`/${roomId}`);
    })

  }

  return ( 
    <>
    <div className="bg-slate-500">
      <button onClick={handleCreateRoom}>Create a room</button>
      <form onSubmit={(e)=>hadnleJoinRoom(e, inputRoom)}>
            <input type="text" value={inputRoom} placeholder="Enter the Room Id" onChange={e=> setInputRoom((e.target.value).trimStart())} />
            <button >Join Room</button>
        </form>
    </div>
    </>
  )
}

export default App
