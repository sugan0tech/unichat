import React from 'react';
import { useMessages } from '../hooks/useMessages';

const ChatWindow: React.FC<{ userId: string }> = ({ userId }) => {
  const messages = useMessages(userId);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <div key={msg.id} className={`message ${msg.sender === userId ? 'sent' : 'received'}`}>
          <span className="sender">{msg.sender}</span>
          <p className="content">{msg.content}</p>
          <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;

