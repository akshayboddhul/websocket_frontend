import React, { useEffect, useState } from "react";
import './socket.css';

function Socket() {
  const [messages, setMessages] = useState([])
  const [inputVal, setInputVal] = useState("")

  
  var ws = null
  ws = new WebSocket("ws://localhost:8000/ws")
  useEffect(() => {
    ws.onopen = () => {
    //   ws.send(JSON.stringify({ type: "message", text:msg, date:Date.now(), id:1}))
        console.log("Client Connected")
    }
    ws.onmessage = (event) => {
        const dataFromServer = JSON.parse(event.data);
        // console.log("DATAFROMSERVER:", dataFromServer)
        setMessages([ ...messages,{ msg: dataFromServer.msg }])
    }
  })

  
  const handleSubmit = e => {
    e.preventDefault();
    ws.send(JSON.stringify({ msg: inputVal}))
    // console.log(messages)
    setInputVal("")
    
  }
  return(
    <div className="container">
        <h2 className="heading">AI Chatbot</h2>
        <div className="chat-container">
            <div className="chat-area">
            {messages.map(message => <p className="chat-msg">{message.msg}</p>)}
            </div>
        
            <div className="chat-input">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="input-txt" onChange={ e => setInputVal(e.target.value)}
                        value={inputVal} placeholder="Type your message.." autoFocus required />
                        <button type="submit" className="send-btn">Send</button>
                    </div>
                </form>
            </div>
        </div>
        
    </div>

  )
}

export default Socket;
