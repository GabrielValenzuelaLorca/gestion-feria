import React from "react";
import { useSelector } from "react-redux";
import TeamCard from "../components/Profile/TeamCard";
import ProjectCard from "../components/Profile/ProjectCard";

const TeamView = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <section className="section">
        <TeamCard />
      </section>
      {user.team.project && (
        <section className="section">
          <ProjectCard />
        </section>
      )}
    </>
  );
};

export default TeamView;
