import { useState } from "react"
import {io} from "socket.io-client";



function ChatBox() {   
    const [socket] = useState(io("http://localhost:5000"));

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleSumbit = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        setMessages(msgs => [...msgs, message])
        socket.emit('chat message', message);
        setMessage("");
    }

    return (
    <div>
        <form onSubmit={handleSumbit}>
            <input type="text" value={message} onChange={e=> setMessage((e.target.value).trimStart())} />
            <button disabled={!socket.connected || message.trim()==="" }>Send</button>
        </form>
        <ul>
            {messages.map(msg => { 
                return <li key={msg}>{msg}</li>
            })}
        </ul>
    </div>
  )
}

export default ChatBox