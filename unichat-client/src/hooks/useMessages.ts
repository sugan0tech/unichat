  import { useEffect, useState } from 'react';
  import { moduleBindings } from '../module_bindings';
  import { spacetimeService } from '../services/spacetimeService';

  export const useMessages = (userId: Identity) => {
    const [messages, setMessages] = useState<moduleBindings.Message[]>([]);

    useEffect(() => {
      spacetimeService.subscribeToMessages((msgs) => {
        const filteredMessages = msgs.filter(
          (msg) => msg.sender === userId || msg.receiver === userId
        );
        setMessages(filteredMessages);
      });
    }, [userId]);

    return messages;
  };

