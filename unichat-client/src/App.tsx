import React, { useEffect, useState } from 'react';
import { spacetimeService } from './services/spacetimeService';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './styles/App.css';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const connectToSpacetime = async () => {
      const identity = spacetimeService.getIdentity();
      if (identity) {
        setCurrentUserId(identity.toString());
        await spacetimeService.registerUser(`User_${identity.toString()}`);
      }
    };

    connectToSpacetime();
  }, []);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Users</h2>
        <UserList onSelectUser={handleUserSelect} />
      </aside>
      <main className="chat-section">
        {selectedUserId && currentUserId ? (
          <>
            <ChatWindow userId={currentUserId} peerId={selectedUserId} />
            <MessageInput receiverId={selectedUserId} senderId={currentUserId} />
          </>
        ) : (
          <p>Select a user to start chatting.</p>
        )}
      </main>
    </div>
  );
};

export default App;

