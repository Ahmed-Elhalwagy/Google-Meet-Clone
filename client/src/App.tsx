/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react"
import {Peer} from "peerjs"
import ChatBox from "./components/ChatBox";
function App() {
  

  return ( 
    <>
    <div className="border">
      {/* <video id="main-stream" autoPlay ref={MainStream} ></video>
      <button className="" onClick={startStream} id="start-stream">Start Stream</button> */}
      <ChatBox/>
    </div>
    </>
  )
}

export default App
