import useFetch from "../../hooks/useFetch";
import { updateUser } from "../../services/user";
import { CAMPUS, ROLES } from "../../utils/constants";

const UserCard = ({ user }) => {
  const [update, loading] = useFetch(updateUser);

  const handleRolChange = async (e) => {
    try {
      update({
        ...user,
        rol: e.target.value,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleCampusChange = async (e) => {
    try {
      update({
        ...user,
        campus: e.target.value,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <article className={"box"}>
      <div className="columns is-vcentered">
        <div
          className={"column is-2 has-text-centered has-text-weight-semibold"}
        >
          {user.name}
        </div>
        <div
          className={"column is-3 has-text-centered has-text-weight-semibold"}
        >
          {user.lastName}
        </div>
        <div
          className={"column is-3 has-text-centered has-text-weight-semibold"}
        >
          {user.email}
        </div>
        <div className="column is-2 has-text-centered">
          <div className="field">
            <div className="control">
              <div
                className={`select is-primary ${loading ? "is-loading" : ""}`}
              >
                <select
                  onChange={handleCampusChange}
                  defaultValue={user.campus}
                  disabled={loading}
                >
                  {CAMPUS.map((campus, index) => (
                    <option value={campus.value} key={index}>
                      {campus.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-2 has-text-centered">
          <div className="field">
            <div className="control">
              <div
                className={`select is-primary ${loading ? "is-loading" : ""}`}
              >
                <select
                  onChange={handleRolChange}
                  defaultValue={user.rol}
                  disabled={loading}
                >
                  {ROLES.map((rol, index) => (
                    <option value={rol} key={index}>
                      {rol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
