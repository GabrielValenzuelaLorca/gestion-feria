import { ROLES } from "../../utils/constants";
import { Select } from "../Forms";

const UserCard = ({user}) => {
  return (
    <article className='box'>
      <div className='columns' key={user.id}>
        <div className='column has-text-centered'>Foto</div>
        <div className='column has-text-centered'>{user.name}</div>
        <div className='column has-text-centered'>{user.email}</div>
        <div className='column has-text-centered'>
          {user.rol}
          {/* <Select
            name={`rol-${user.id}`}
            // label="Tipo Actividad"
            options={ROLES}
            validations={['required']}
            // disabled={currentActivity.id}
          /> */}
        </div>
      </div>
    </article>
  )
};

export default UserCard;