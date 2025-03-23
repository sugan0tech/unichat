import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { spacetimeService } from './services/spacetimeService';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import Callback from './components/Callback';
import './styles/App.css';

const MainApp: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const connectToSpacetime = async () => {
      const identity = spacetimeService.getIdentity();
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://possible-flamingo-large.ngrok-free.app',
        }
      });
      spacetimeService.connectWithToken(token)
      if (identity) {
        console.log(`Identity ${identity} trying to create user`)
        setCurrentUserId(identity.toString());
        console.log(`Going to register user ${identity.toHexString()}`);
        // First, register the user with a default name.
        await spacetimeService.registerUser(`User_${identity.toString()}`);
        // Then update the user's name with the email prefix if available.
        if (user?.email) {
          const emailPrefix = user.email.split('@')[0];
          await spacetimeService.setName(emailPrefix);
        }
      }
    };

    if (isAuthenticated) {
      connectToSpacetime();
    }
  }, [isAuthenticated, user]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <h2>Welcome to the Chat App</h2>
        <button onClick={() => loginWithRedirect()}>Login</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Users</h2>
        <UserList onSelectUser={handleUserSelect} />
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
          Logout
        </button>
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

