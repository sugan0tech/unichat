  import React, { useState } from 'react';
  import { spacetimeService } from '../services/spacetimeService';
  import { Identity } from '@clockworklabs/spacetimedb-sdk';

  interface MessageInputProps {
    receiverId: Identity;
  }

  const MessageInput: React.FC<MessageInputProps> = ({ receiverId }) => {
    const [content, setContent] = useState('');

    const handleSend = () => {
      if (content.trim()) {
        spacetimeService.sendMessage(receiverId, content);
        setContent('');
      }
    };

    return (
      <div className="message-input">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    );
  };

  export default MessageInput;

