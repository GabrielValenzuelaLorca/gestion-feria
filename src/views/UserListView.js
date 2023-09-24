import { useEffect, useRef, useState } from "react";
import UserCard from "../components/UserList/UserCard";
import useFetch from "../hooks/useFetch";
import { getUsers } from "../services/user";

const UserListView = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const filterRef = useRef();
  const [fetchUsers, isLoading] = useFetch(getUsers, setUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(filter.toLowerCase()) ||
          user.email.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [users, filter]);

  return (
    <section className="section">
      <section className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title is-3 level-item">Listado de Usuarios</h1>
          </div>
          <div className="level-right">
            <div className="field has-addons has-addons-right level-item">
              <div className="control">
                <input
                  ref={filterRef}
                  className="input is-primary"
                  placeholder="Buscar usuario"
                />
              </div>

              <div className="control">
                <button
                  className="button is-primary"
                  onClick={() => {
                    setFilter(filterRef.current.value);
                  }}
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <progress className="progress is-primary" />
        ) : (
          <>
            {filteredUsers.length ? (
              filteredUsers.map((user, index) => (
                <UserCard key={index} user={user} index={index} />
              ))
            ) : (
              <p className="notification has-text-centered">
                No se encuentran usuarios
              </p>
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default UserListView;
