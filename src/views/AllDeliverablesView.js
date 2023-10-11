import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { diffDates } from "../utils/functions";
import { getActivities } from "../services/activity";
import { useNavigate } from "react-router-dom";

const AllDeliverablesView = () => {
  const [activitiesState, setActivities] = useState([]);
  const [fetchActivities, isLoading] = useFetch(getActivities, setActivities);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleRubricButton = (activityId) => {
    navigate(`/rubrica/${activityId}`);
  };

  const handleEvaluationButton = (activityId) => {
    navigate(`/evaluaciones/${activityId}`);
  };

  return (
    <section className="section">
      <section className="container">
        <h1 className="title is-3">Estado de Entregables</h1>
        {isLoading ? (
          <progress className="progress is-primary" />
        ) : activitiesState.length ? (
          activitiesState.map((activity) => {
            const toEndTime = diffDates(new Date(), activity.end);
            return (
              <div key={activity.id} className="box">
                <div className="columns">
                  <div className="column">
                    <h1 className="title is-4">{activity.name}</h1>
                    <p className="subtitle is-6">{activity.description}</p>
                    <p>
                      Fecha de término:{" "}
                      {activity.end.split("/").reverse().join("/")}
                    </p>
                    {activity.delay && (
                      <p>
                        Fecha de cierre:{" "}
                        {activity.close.split("/").reverse().join("/")}
                      </p>
                    )}
                    <p>
                      Tiempo restante:{" "}
                      {toEndTime > 0
                        ? `${toEndTime} día(s)`
                        : "Plazo completado"}
                    </p>
                    <p>Estado de envío: 23/50 envíos</p>
                  </div>

                  <div className="column is-narrow">
                    {activity.rubric ? (
                      <div className="buttons">
                        <button
                          className="is-link button is-pulled-right is-outlined"
                          onClick={() => handleRubricButton(activity.id)}
                        >
                          <span className="icon is-small">
                            <i className="fa-solid fa-eye"></i>
                          </span>
                          <span>Ver Rúbrica</span>
                        </button>
                        <button
                          className="is-link button is-pulled-right"
                          onClick={() => handleEvaluationButton(activity.id)}
                        >
                          <span className="icon is-small">
                            <i className="fa-solid fa-list-check"></i>
                          </span>
                          <span> Ver Evaluaciones</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        className="is-primary button is-pulled-right"
                        onClick={() => handleRubricButton(activity.id)}
                      >
                        <span className="icon is-small">
                          <i className="fas fa-plus"></i>
                        </span>
                        <span>Crear Rúbrica</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="notification">
            No hay actividades por realizar en este momento
          </p>
        )}
      </section>
    </section>
  );
};

export default AllDeliverablesView;
