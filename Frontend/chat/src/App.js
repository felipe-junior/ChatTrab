import './App.css';
import Chat from './components/Chat';
import Painel from './components/Painel';
import { useEffect, useState } from 'react';
import { socket } from './services/socket';

function App() {
  const [sessionId, setSessionId] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    socket.on('connect', ()=>{
      setSessionId(socket.id);
  })
  }, [])
  return (
    <div className="App">
      { socket? (
        <>
        <div className='a'> SessionId:  {{sessionId} ? sessionId: "Nao conectado"} </div>
        <Painel socket={socket} messages={messages} setMessages={setMessages}></Painel>
        <Chat socket={socket} messages={messages} setMessages={setMessages}></Chat>
        </>
      ) : (<div>Not Connected</div>) }       
    </div>
  );
}

export default App;
