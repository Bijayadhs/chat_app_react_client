import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [openChat, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chat, setChat] = useState([]);


  const chatRef = useRef(null);

  function handleOpenChat() {
    setChatOpen((prevChat) => !prevChat)
  }
  function handleChatMessage(e) {
    setChatMessage(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    setChat([...chat, { id: Date.now(), user: "me", message: chatMessage }]);
    setChatMessage('');

  }

  useEffect(() => {
    if (openChat)
      return chatRef.current.focus();
  }, [openChat])

  return (
    <div className="App">
      <div className="header">
        <h2>Chat App</h2>
        <button onClick={handleOpenChat} className="chat-arrow">&#8594;</button>
      </div>
      <div className={"chat-message " + (openChat ? "visible" : "")}>
        <div className="chat-header">
          <h3>Chat</h3>
          <button onClick={() => setChatOpen(false)} className="close-chat">&#10005;</button>
        </div>
        <div className="chat-body">
          {chat && chat.map((c) => { return <Chat key={c.id} c={c} />; })}
        </div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input type="text" onChange={handleChatMessage} ref={chatRef} value={chatMessage} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}


export const Chat = ({ c }) => {
  return (
    <div className="chat-sender">
      <div className="message">{c.message}</div>
      <div className="avatar">{c.user}</div>
    </div>
  )
}


export default App;
