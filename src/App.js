import React, { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState({})
  

  
  var ws = null
  useEffect(() => {
    ws = new WebSocket("ws://localhost:8000/ws")
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "message", text:msg, date:Date.now(), id:1}))
    }
    ws.onmessage = (event) => {console.log(event.data)}
  })

  
  const handleSubmit = e => {
    e.preventDefault();
    setMsg("")
  }
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={ e => setMsg(e.target.value)} value={({text:msg})} autoFocus/>
        <button type="submit">Send</button>
      </form>
    </div>

  )
}

export default App;
