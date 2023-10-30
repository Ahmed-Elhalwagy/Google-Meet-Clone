import { useEffect, useState } from "react"
import {Socket} from "socket.io-client";

interface ChatBoxProps {
    socket: Socket;
    roomId: string | undefined;
  }

function ChatBox({socket, roomId}: ChatBoxProps) {   

    const [inputMessage, setInputMessage] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(()=>{
        socket.volatile.on('chat message', payload =>{
            setMessages(msgs => [...msgs, payload])
            console.log('message', payload.msg);
        })

        return ()=> {
            socket.off('chat message');
        }

    })
    
    const handleSendMessage = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        if(socket.connected){
            socket.emit('chat message', {msg: inputMessage, userId: socket.id, roomId:roomId});
            setInputMessage("");
        }
    }

    return (
    <div>
        <form onSubmit={handleSendMessage}>
            <input type="text" value={inputMessage} onChange={e=> setInputMessage((e.target.value).trimStart())} />
            <button disabled={!socket.connected || inputMessage.trim()==="" }>Send</button>
        </form>
        <ul>
            {messages.map(msg => { 
                return <li key={msg.msg}>{msg.msg}</li>
            })}
        </ul>
    </div>
  )
}

export default ChatBox