import { useSelector } from "react-redux";
import TeamCard from "../components/Profile/TeamCard";
import UserCard from "../components/Profile/UserCard";

const ProfileView = () => {
  const user = useSelector(state => state.user);

  return (
    <section>
      <section className='section'>
        <UserCard user={user}/>
      </section>
      <section className='section'>
        {
          user.rol === "Alumno" &&
            <TeamCard 
              user={user}
            />
        }
      </section>
    </section>
  )
}

export default ProfileView;