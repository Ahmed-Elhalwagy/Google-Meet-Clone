import { io, Socket } from "socket.io-client";
import MainVideo from "./components/MainVideo";

const socket : Socket = io();

function Room() {
  return (
    <div>
      <MainVideo socket={socket}></MainVideo>
    </div>
  )
}

export default Room