import { Socket } from "socket.io-client";
// import MainVideo from "./components/MainVideo";
import ChatBox from "./components/ChatBox";
import { useParams } from "react-router-dom";
// import MainVideo from "./components/MainVideo";

interface RoomProps {
  socket: Socket;
}

function Room({socket}: RoomProps) {
    const {roomId} = useParams();
    if(roomId === undefined) return;


  socket.on("connect", ()=>{
    console.log('Socket ID:' , socket.id);
  });
    socket.on("disconnect", ()=>{
    console.log('Your are Disconnected')});

  socket.on("user-connected", ()=>{
    console.log("User Connected");
  })
  
  return (
    <div>
      <ChatBox socket={socket} roomId={roomId}/>
      {/* <MainVideo socket={socket} roomId={roomId}></MainVideo> */}
    </div>
  )
}

export default Room