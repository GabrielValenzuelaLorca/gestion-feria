import { useSelector } from "react-redux";
import ProjectCard from "../components/Profile/ProjectCard";
import TeamCard from "../components/Profile/TeamCard";
import UserCard from "../components/Profile/UserCard";

const ProfileView = () => {
  const user = useSelector(state => state.user);

  return (
    <section>
      <section className='section'>
        <UserCard
          user={user}
        />
      </section>
      {
        user.rol === "Alumno" &&
          <>
            <section className='section'>
              <TeamCard
                user={user}
              />
            </section>
            {
              user.team.project &&
                <section className='section'>
                  <ProjectCard
                    user={user}
                  />
                </section>
            }
          </>
      }
    </section>
  )
}

export default ProfileView;