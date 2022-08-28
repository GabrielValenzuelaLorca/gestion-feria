import useFetch from "../../hooks/useFetch";
import { updateUser } from "../../services/user";
import { ROLES } from "../../utils/constants";

const rowStyle = (index) =>`
  column has-text-centered has-text-weight-semibold
  ${index % 2 ? 'has-text-white' : ''}
`;

const UserCard = ({user, index}) => {
  const [update, loading] = useFetch(updateUser);

  const handleRolChange = async (e) => {
    try {
      update({
        body: {
          ...user,
          rol: e.target.value
        }
      });
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <article className={`box ${index % 2 ? 'has-background-primary' : ''}`}>
      <div className='columns' key={user.id}>
        <div className={rowStyle(index)}>Foto</div>
        <div className={rowStyle(index)}>{user.name}</div>
        <div className={rowStyle(index)}>{user.email}</div>
        <div className='column has-text-centered'>
          <div className="field">
            <div className="control">
              <div className={`select is-primary ${loading ? 'is-loading' : ''}`}>
                <select
                  onChange={handleRolChange}
                  defaultValue={user.rol}
                  disabled={loading}
                >
                  {ROLES.map((rol, index) =>
                    <option value={rol} key={index}>{rol}</option>  
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
};

export default UserCard;