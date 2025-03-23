  import { useEffect, useState } from 'react';
  import { moduleBindings } from '../module_bindings';
  import { spacetimeService } from '../services/spacetimeService';

  export const useUsers = () => {
    const [users, setUsers] = useState<moduleBindings.User[]>([]);

    useEffect(() => {
      spacetimeService.subscribeToUsers(setUsers);
    }, []);

    return users;
  };

