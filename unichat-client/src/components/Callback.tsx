// src/components/Callback.tsx
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const { isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !error) {
      // Once loading is complete and there's no error, redirect to home (or chat) page
      navigate('/');
    }
  }, [isLoading, error, navigate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Loading...</div>;
};

export default Callback;

