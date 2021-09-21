import React, { useEffect, useState } from "react";

function Socket() {
  const [messages, setMessages] = useState([])
  const [inputVal, setInputVal] = useState("")

  
  var ws = null
  useEffect(() => {
    ws = new WebSocket("ws://localhost:8000/ws")
    ws.onopen = () => {
    //   ws.send(JSON.stringify({ type: "message", text:msg, date:Date.now(), id:1}))
        console.log("Client Connected")
    }
    ws.onmessage = (event) => {
        const dataFromServer = JSON.parse(event.data);
        console.log("DATAFROMSERVER:", dataFromServer)
        setMessages([ ...messages,{ msg: dataFromServer.msg }])
    }
  })

  
  const handleSubmit = e => {
    e.preventDefault();
    ws.send(JSON.stringify({ msg: inputVal}))
    console.log(messages)
    setInputVal("")
    
  }
  return(
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={ e => setInputVal(e.target.value)}
            value={inputVal} autoFocus/>
            <button type="submit">Send</button>
        </form>
        {messages.map(message => <ul><li>{message.msg}</li></ul>)}
    </div>

  )
}

export default Socket;
