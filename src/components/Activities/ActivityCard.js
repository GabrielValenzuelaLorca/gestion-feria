import React from "react";
import { diffDates, setModalState } from "../../utils/functions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ActivityCard = ({ activity, setModal, setCurrentActivity }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleRubricButton = () => {
    navigate(`/rubrica/${activity.id}`);
  };

  return (
    <div className="card block">
      <div className="card-header level">
        <div className="level-left">
          <h2 className="level-item card-header-title">{activity.name}</h2>
        </div>
        {["Profesor", "Administrador"].includes(user.rol) && (
          <div className="level-right" style={{ paddingRight: 16 }}>
            {activity.rubric ? (
              <button
                className="is-link button is-small is-rounded level-item"
                onClick={handleRubricButton}
              >
                <span className="icon is-small">
                  <i className="fa-solid fa-eye"></i>
                </span>
                <span>Ver Rúbrica</span>
              </button>
            ) : (
              <button
                className="is-primary button is-small is-rounded level-item"
                onClick={handleRubricButton}
              >
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Crear Rúbrica</span>
              </button>
            )}
            <button
              className="is-link button is-small is-rounded level-item"
              onClick={() => {
                setCurrentActivity(activity);
                setModalState(true, setModal);
              }}
            >
              Editar
            </button>
          </div>
        )}
      </div>

      <div className="card-content">
        <p className="is-size-5">{activity.description}</p>
      </div>

      <div className="card-footer">
        <p className="card-footer-item">
          Duración: {diffDates(activity.start, activity.end)} día(s)
        </p>
        <p className="card-footer-item">
          Tiempo Restante: {diffDates(new Date(), activity.end)} día(s)
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
