import { useState } from "react"
import {io} from "socket.io-client";

const socket = io("http://localhost:8000/");

function ChatBox() {
    const [message, setMessage] = useState<string>("");

    const handleSumbit = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        socket.emit('chat message', message);
        setMessage("");
    }

    return (
    <div>
        <form onSubmit={handleSumbit}>
            <input type="text" value={message} onChange={e=> setMessage((e.target.value).trimStart())} />
            <button>Send</button>
        </form>
    </div>
  )
}

export default ChatBox