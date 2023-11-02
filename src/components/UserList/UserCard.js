import useFetch from "../../hooks/useFetch";
import { updateUser } from "../../services/user";
import { ROLES } from "../../utils/constants";

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

  return (
    <article className={"box"}>
      <div className="columns is-vcentered">
        <div className={"column has-text-centered has-text-weight-semibold"}>
          Foto
        </div>
        <div className={"column has-text-centered has-text-weight-semibold"}>
          {user.name}
        </div>
        <div className={"column has-text-centered has-text-weight-semibold"}>
          {user.email}
        </div>
        <div className="column has-text-centered">
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
