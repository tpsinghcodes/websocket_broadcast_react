import logo from './logo.svg';
import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from 'react';
const socket = io.connect("http://localhost:3001")


function App() {
  const [message, setMesssage] = useState("")
  const [room, setRoom] = useState("")
  const [recmsg, setRecmsg] = useState("")

  const submitMessage = () => {
    // connect.emit("UserMessage", {message})
    socket.emit("UserMessage", { message, room });
  }

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("room_no", room);
    }
  };

  useEffect(()=>{
    socket.on("resend",(data)=>{
      setRecmsg(data.message)
    })
  },[socket])
  return (
    <div className="App">
      <input onChange={(event)=>{setRoom(event.target.value)}}/>
     <button onClick={joinRoom}>Join Room</button><br/>
     <input onChange={(event)=>{setMesssage(event.target.value)}}/>
     <button onClick={submitMessage}>Submit</button>
     <h1>Messages</h1>
     <div>{recmsg}</div>
    </div>
    
  );
}

export default App;
