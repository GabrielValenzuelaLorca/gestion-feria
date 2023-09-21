import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getActivities } from "../services/activity";
import useFetch from "../hooks/useFetch";
import { diffDates } from "../utils/functions";

const DeliverablesView = () => {
  const [activitiesState, setActivities] = useState([]);
  const [fetchActivities, isLoadingActivities] = useFetch(
    getActivities,
    setActivities
  );

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);
  return (
    <section className="section pb-0">
      {isLoadingActivities ? (
        <progress className="progress is-primary" />
      ) : activitiesState.length ? (
        activitiesState.map((activity) => {
          return (
            <div key={activity.id} className="box columns">
              <div className="column">
                <h1 className="title">{activity.name}</h1>
                <p className="subtitle">{activity.description}</p>
                <p>
                  Fecha de término:{" "}
                  {activity.end.split("-").reverse().join("/")}
                </p>
                <p>
                  Tiempo restante: {diffDates(new Date(), activity.end)} día(s)
                </p>
              </div>
              <div className="column is-narrow">
                <div className="block">
                  <div className="file has-name is-boxed">
                    <label className="file-label">
                      <input className="file-input" type="file" name="file" />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">Seleccionar archivo</span>
                      </span>
                      <span className="file-name">
                        Screen Shot 2017-07-29 at 15.54.25.png
                      </span>
                    </label>
                  </div>
                </div>
                <div className="block">
                  <button className="button is-success is-pulled-right">
                    Enviar
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

      <div className="box">
        <div className="level">
          <div className="level-left">
            <div>
              <h1 className="title">Estimación de costos</h1>
              <p>Aquí iría otra descripción muy buena</p>
              <p>Fecha de cierre: 20/01/2022</p>
              <p>Tiempo restante: 2 días</p>
            </div>
          </div>
          <div className="level-right">
            <button className="button is-static">
              <span class="icon">
                <i class="fas fa-check"></i>
              </span>
              <span>Enviado</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliverablesView;
