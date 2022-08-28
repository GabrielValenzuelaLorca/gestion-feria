  import { useEffect, useState } from 'react';
import UserCard from '../components/UserList/UserCard';
import useFetch from '../hooks/useFetch';
import { getUsers } from '../services/user';

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState();
  const [fetchUsers, isLoading] = useFetch(getUsers, setUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleFilter = () => {
    console.log('filter');
  };

  return (
    <section className='section'>
      <section className='container'>
        {
          isLoading ?
            <progress className='progress is-primary'/>
          :
            <>
              <div className='field has-addons has-addons-right'>
                <div className='control'>
                  <input 
                    className='input is-primary' 
                    placeholder='Buscar usuario'
                    value={filter}
                    onChange={e => {setFilter(e.target.value)}}
                  />
                </div>

                <div class="control">
                  <button class="button is-primary" onClick={handleFilter}>
                    Buscar
                  </button>
                </div>
              </div>
              {
                users.map((user, index) => 
                  <UserCard
                    key={index}
                    user={user}
                    index={index}
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