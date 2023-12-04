import { useSelector } from "react-redux";
import UserCard from "../components/Profile/UserCard";

const ProfileView = () => {
  const user = useSelector((state) => state.user);

  return (
    <section className="section">
      <UserCard user={user} />
    </section>
  );
};

export default ProfileView;
