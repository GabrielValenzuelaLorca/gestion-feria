  import { useEffect, useState } from 'react';
import UserCard from '../components/UserList/UserCard';
import useFetch from '../hooks/useFetch';
import { getUsers } from '../services/user';

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [fetchUsers, isLoading] = useFetch(getUsers, setUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className='section'>
      <section className='container'>
        {
          isLoading ?
            <progress className='progress is-primary'/>
          :
            <>
              {
                users.map(user => 
                  <UserCard
                    user={user}
                  />
                )
              }
            </>
        }
      </section>
    </section>
  )
}

export default UserListView;