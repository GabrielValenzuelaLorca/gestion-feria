import React, { useState } from "react";
import StoryForm from "./StoryForm";
import {
  diffDates,
  formatDatetimeToString,
  setModalState,
} from "../../utils/functions";
import { useSelector } from "react-redux";

const BoardInfo = () => {
  const settings = useSelector((state) => state.settings);
  const user = useSelector((state) => state.user);
  const activities = useSelector((state) => state.activities);
  const [modalState, setModal] = useState(false);

  return (
    <>
      {user.rol !== "Profesor" &&
        activities.map((activity, i) => (
          <section className="message is-primary" key={i}>
            <div className="message-header">{activity.name}</div>
            <div className="message-body">
              <div className="block">
                <p>{activity.description}</p>
              </div>

              <div className="block">
                <p>
                  <strong>Fecha de Término:</strong>{" "}
                  {formatDatetimeToString(activity.end)}
                </p>
                <p>
                  <strong>Tiempo Restante:</strong>{" "}
                  {diffDates(new Date(), activity.end)} días
                </p>
              </div>
            </div>
          </section>
        ))}
      {user.rol === "Alumno" && (
        <div className="block">
          <button
            className="button is-success"
            onClick={() => setModalState(true, setModal)}
            disabled={!settings.canCreate}
          >
            <span className="icon is-small">
              <i className="fas fa-plus"></i>
            </span>
            <span>Nueva Historia</span>
          </button>
          {!settings.canCreate && (
            <p className="is-size-7 has-text-grey-light">
              *La creación de historias aún no está habilitada
            </p>
          )}
        </div>
      )}
      <StoryForm
        isActive={modalState}
        handleClose={() => setModalState(false, setModal)}
      />
    </>
  );
};

export default BoardInfo;
