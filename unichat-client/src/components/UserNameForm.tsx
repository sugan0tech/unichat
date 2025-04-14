import React, { useState } from 'react';
import { spacetimeService } from '../services/spacetimeService';

const UserNameForm: React.FC = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() !== '') {
      await spacetimeService.setName(name.trim());
      console.log('Name updated!');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Enter your display name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
        Update Name
      </button>
    </form>
  );
};

export default UserNameForm;

