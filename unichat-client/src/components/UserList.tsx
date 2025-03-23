import React from 'react';
import { useUsers } from '../hooks/useUsers';

const UserList: React.FC<{ onSelectUser: (userId: string) => void }> = ({ onSelectUser }) => {
  const users = useUsers();

  return (
    <div className="user-list">
      <h3>Online Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user.id)}>
            {user.name || 'Anonymous'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
