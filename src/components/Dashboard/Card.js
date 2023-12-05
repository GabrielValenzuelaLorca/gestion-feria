import React from "react";
import { SPRINTS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Card = ({ team }) => {
  const navigate = useNavigate();

  const handleStories = () => {
    navigate(`/historias/${team.id}`);
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="team_logo"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="level">
          <div className="level-left">
            <p className={`title ${team.project.name ? "" : "is-italic"}`}>
              {team.project.name || "Sin Proyecto"}
            </p>
          </div>
          <div className="level-right">
            <button
              className="button is-primary is-small is-rounded"
              onClick={handleStories}
            >
              <span className="icon is-small">
                <i className="fa-solid fa-eye"></i>
              </span>
              <span>Ver Historias</span>
            </button>
          </div>
        </div>

        <p className="subtitle">{team.name}</p>
        <p className="mb-1">
          Progreso total: ({team.progress.total}%)
          <progress
            className="progress is-link"
            value={team.progress.total}
            max="100"
          ></progress>
        </p>
        {SPRINTS.map((sprint, i) => (
          <p className="mb-1" key={i}>
            {sprint}: ({team.progress[sprint] || 0}%)
            <progress
              className="progress is-primary"
              value={team.progress[sprint] || 0}
              max="100"
            ></progress>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Card;
