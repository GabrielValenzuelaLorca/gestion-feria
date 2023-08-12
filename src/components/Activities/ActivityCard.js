import React from "react";
import { diffDates, setModalState } from "../../utils/functions";
import { useSelector } from "react-redux";

const ActivityCard = ({ activity, setModal, setCurrentActivity }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="card block">
      <div className="card-header">
        <h2 className="card-header-title">{activity.name}</h2>

        {["Profesor", "Administrador"].includes(user.rol) && (
          <button
            className="mt-1 mr-1 button is-light is-rounded"
            onClick={() => {
              setCurrentActivity(activity);
              setModalState(true, setModal);
            }}
          >
            <span className="icon">
              <i className="fas fa-lg fa-ellipsis-v"></i>
            </span>
          </button>
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
