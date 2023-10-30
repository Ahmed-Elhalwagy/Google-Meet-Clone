import { Socket } from "socket.io-client";
// import MainVideo from "./components/MainVideo";
import ChatBox from "./components/ChatBox";
// import MainVideo from "./components/MainVideo";

const getCurrentRoomID = () => {
  const path = window.location.pathname.split('/');
  if(path[path.length-1]==='')
    return path[path.length-2];
  else 
    return path[path.length-1];
}

interface RoomProps {
  socket: Socket;
}

function Room({socket}: RoomProps) {
    const roomId = getCurrentRoomID();
    if(roomId === undefined) return;
    socket.emit('room:join', {roomId , userId: socket.id});

  // socket.on("connect", ()=>{
  //   console.log('Socket ID:' , socket.id);
  // });
  //   socket.on("disconnect", ()=>{
  //   console.log('Your are Disconnected')});

  // socket.on("user-connected", ()=>{
  //   console.log("User Connected");
  // })
  
  return (
    <div>
      <ChatBox socket={socket} roomId={roomId}/>
      {/* <MainVideo socket={socket} roomId={roomId}></MainVideo> */}
    </div>
  )
}

export default Room