import { useEffect, useState } from "react"
import {Peer} from "peerjs"

function App() {
  const [peer, setPeer] = useState<Peer>();
  const [mainStream, setMainStream] = useState<MediaStream>();

  useEffect(() => {
    const peer = new Peer({
      host: 'localhost:3000',
      path: '/peerjs'
    });

    setPeer(peer);

    peer.on('open', (id) => {
      console.log(id);
    })

    return () => {
      peer.destroy();
    }
  })


  return (
    <>
      <video id="main-stream" autoPlay ></video>
    </>
  )
}

export default App
