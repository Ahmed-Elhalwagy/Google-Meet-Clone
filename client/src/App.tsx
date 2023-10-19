/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react"
import {Peer} from "peerjs"
import ChatBox from "./components/ChatBox";

function App() {
  const [peer, setPeer] = useState<Peer>();
  const [mainStream, setMainStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>('');
  const MainStream =   useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer({
      host: 'localhost:3000',
      path: '/peerjs'
    });

    setPeer(peer);

    peer.on('open', (id) => {
      console.log('My peer ID is: ' + id);
      setPeerId(id);
    })
    console.log(peer.id);
    return () => {
      peer.destroy();
    }
  },[]);

  const startStream = () => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      setMainStream(stream);
      MainStream.current!.srcObject = stream;
    }).then(()=> {
      
    }).catch((err) => {
      console.log(err);
    })
  }

0

  return (
    <>
      <video id="main-stream" autoPlay ref={MainStream} ></video>
      <button onClick={startStream} id="start-stream">Start Stream</button>
      <ChatBox/>
    </>
  )
}

export default App
