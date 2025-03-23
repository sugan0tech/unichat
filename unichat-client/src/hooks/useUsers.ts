  import { useEffect, useState } from 'react';
  import { User } from '../module_bindings';
  import { spacetimeService } from '../services/spacetimeService';

  export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    console.log(`fetching users from module.. current users:  ${users}`);

    useEffect(() => {
      spacetimeService.subscribeToUsers(setUsers);
    }, []);

    return users;
  };

