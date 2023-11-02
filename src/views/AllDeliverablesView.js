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

  const handleEvaluationButton = (activityId) => {
    navigate(`/entregables/${activityId}`);
  };

  return (
    <section className="section">
      <section className="container">
        <h1 className="title is-3">Estado de entregables</h1>
        {isLoading ? (
          <progress className="progress is-primary" />
        ) : activitiesState.length ? (
          activitiesState.map((activity) => {
            const toEndTime = diffDates(new Date(), activity.end);
            return (
              <div key={activity.id} className="box">
                <div className="columns is-vcentered">
                  <div className="column">
                    <h1 className="title is-4">{activity.name}</h1>
                    <p className="subtitle is-6">{activity.description}</p>
                    <div className="field is-grouped is-grouped-multiline">
                      <div className="control">
                        <div className="tags has-addons">
                          <span className="tag is-primary is-rounded">
                            Fecha de término
                          </span>
                          <span className="tag is-primary is-light is-rounded">
                            {activity.end.split("/").reverse().join("/")}
                          </span>
                        </div>
                      </div>
                      {activity.delay && (
                        <div className="control">
                          <div className="tags has-addons">
                            <span className="tag is-primary is-rounded">
                              Fecha de cierre
                            </span>
                            <span className="tag is-primary is-light is-rounded">
                              {activity.close.split("/").reverse().join("/")}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="control">
                        <div className="tags has-addons">
                          <span className="tag is-primary is-rounded">
                            Tiempo restante
                          </span>
                          <span className="tag is-primary is-light is-rounded">
                            {toEndTime > 0
                              ? `${toEndTime} día(s)`
                              : "Plazo completado"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="column is-narrow">
                    <button
                      className="is-link button is-pulled-right"
                      onClick={() => handleEvaluationButton(activity.id)}
                    >
                      <span className="icon is-small">
                        <i className="fa-solid fa-list-check"></i>
                      </span>
                      <span> Ver Entregables</span>
                    </button>
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
