import { useEffect, useRef, useState } from "react"
import {Peer} from "peerjs"

function App() {
  const [peer, setPeer] = useState<Peer>();
  const [mainStream, setMainStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>('');
  const BtnStartStream = useRef<HTMLButtonElement>(null);
  const MainStream =   useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const peer = new Peer({
      host: 'localhost:3000',
      path: '/peerjs'
    });

    setPeer(peer);

    peer.on('open', (id) => {
      console.log(id);
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


  return (
    <>
      <video id="main-stream" autoPlay ref={MainStream} ></video>
      <button ref={BtnStartStream} id="start-stream">Start Stream</button>
    </>
  )
}

export default App
