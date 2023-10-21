import  { useEffect, useRef, useState } from 'react'
import Peer, { MediaConnection } from 'peerjs'
import {Socket}  from 'socket.io-client';


const getCurrentRoomID = () => {
  const path = window.location.pathname.split('/');
  if(path[path.length-1]==='')
    return path[path.length-2];
  else 
    return path[path.length-1];
}

type Peers = {
  [key: string]: MediaConnection;
};

interface MainVideoProps {
  socket: Socket;
  roomId: string;
}

export default function MainVideo({socket}: MainVideoProps) {
  const [myPeer,] = useState(new Peer({
    port: 5000,
    host: 'localhost',
    path: '/peerjs',
  }));
  const [peers, setPeers] = useState({} as Peers);
  const [ROOM_ID,] = useState(getCurrentRoomID()); //window.location.pathname.split('/')[2
  // const [stream, setStream] = useState(null)
  const myVideo = useRef(document.getElementById('main-video') as HTMLVideoElement);
  const videoGrid = useRef(document.getElementById('video-grid') as HTMLDivElement);

  useEffect(() => {
    
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      addVideoStream(myVideo.current, stream)
    
      myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })
    
      socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
      })
    })

    socket.on('user-disconnected', userId => {
      if (peers[userId]) peers[userId].close()
    })
    
    myPeer.on('open', id => {
      socket.emit('room:join', ROOM_ID, id)
    })
    return ()=> {
      myPeer.destroy()
    }
  }, []);

  function connectToNewUser(userId: string, stream: MediaStream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })
  
    setPeers(prev => {
      return {...prev, [userId]: call}
    })
  }
  
  function addVideoStream(video:HTMLVideoElement , stream: MediaStream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.current.append(video)
  }


  return (
    <div>
      <video id="main-video" ref={myVideo} className="video-player" autoPlay playsInline></video>
      <div id="video-grid" ref={videoGrid}></div>
    </div>
  )
}
