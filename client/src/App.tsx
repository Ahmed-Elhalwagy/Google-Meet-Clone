/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react"
import {Peer} from "peerjs"
import ChatBox from "./components/ChatBox";

function App() {
  

  return (
    <>
      
      <button id="start-stream">Start Stream</button>
      <ChatBox/>
    </>
  )
}

export default App
