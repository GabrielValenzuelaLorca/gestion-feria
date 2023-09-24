import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { diffDates, formatDatetimeToString } from "../utils/functions";
import {
  createDeliverable,
  getDeliverablesByTeam,
} from "../services/deliverable";
import { useSelector } from "react-redux";

const DeliverablesView = () => {
  const user = useSelector((state) => state.user);
  const [deliverablesState, setDeliverables] = useState([]);

  const [fetchDeliverables, isLoadingDeliverables] = useFetch(
    getDeliverablesByTeam,
    setDeliverables
  );

  const [fetchCreateDeliverable, isLoadingCreate] = useFetch(createDeliverable);

  useEffect(() => {
    fetchDeliverables(user.team.id);
  }, [fetchDeliverables, user.team.id]);

  const handleEndButton = async (activity_id) => {
    await fetchCreateDeliverable(activity_id);
    await fetchDeliverables(user.team.id);
  };

  return (
    <section className="section">
      <section className="container">
        <h1 className="title is-3">Entregables</h1>
        {isLoadingDeliverables ? (
          <progress className="progress is-primary" />
        ) : deliverablesState.length ? (
          deliverablesState.map((activity) => {
            return (
              <div key={activity.id} className="box">
                <div className="columns">
                  <div className="column">
                    <h1 className="title is-4">{activity.name}</h1>
                    <p className="subtitle is-6">{activity.description}</p>
                    {activity.state === "pending" ? (
                      <>
                        <p>
                          Fecha de término:{" "}
                          {activity.end.split("/").reverse().join("/")}
                        </p>
                        <p>
                          Tiempo restante: {diffDates(new Date(), activity.end)}{" "}
                          día(s)
                        </p>
                      </>
                    ) : activity.state === "pending_delayed" ? (
                      <>
                        <p>
                          Fecha de cierre:{" "}
                          {activity.close.split("/").reverse().join("/")}
                        </p>
                        <p>
                          Tiempo de atraso restante:{" "}
                          {diffDates(new Date(), activity.close)} día(s)
                        </p>
                      </>
                    ) : activity.state === "closed" ? (
                      <p>No entregado</p>
                    ) : (
                      <>
                        <p>
                          Fecha de envío:{" "}
                          {formatDatetimeToString(activity.send_date)}
                        </p>
                        <p>
                          Estado de envío:{" "}
                          {activity.state === "done" ? "A tiempo" : "Atrasado"}
                        </p>
                      </>
                    )}
                  </div>
                  {activity.state !== "closed" && (
                    <div className="column is-narrow">
                      {activity.type === "Documento" ? (
                        <>
                          <div className="block">
                            <div className="file has-name is-boxed">
                              <label className="file-label">
                                <input
                                  className="file-input"
                                  type="file"
                                  name="file"
                                />
                                <span className="file-cta">
                                  <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                  </span>
                                  <span className="file-label">
                                    Seleccionar archivo
                                  </span>
                                </span>
                                <span className="file-name">
                                  Screen Shot 2017-07-29 at 15.54.25.png
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="block">
                            {["pending", "pending_delayed"].includes(
                              activity.state
                            ) ? (
                              <button className="button is-success is-pulled-right">
                                Enviar
                              </button>
                            ) : (
                              <button className="button is-static">
                                <span className="icon">
                                  <i className="fas fa-check"></i>
                                </span>
                                <span>Enviado</span>
                              </button>
                            )}
                          </div>
                        </>
                      ) : ["pending", "pending_delayed"].includes(
                          activity.state
                        ) ? (
                        <button
                          className={`button is-success is-pulled-right ${
                            isLoadingCreate && "is-loading"
                          }`}
                          onClick={() => handleEndButton(activity.id)}
                          disabled={isLoadingCreate}
                        >
                          Terminar
                        </button>
                      ) : (
                        <button className="button is-primary" disabled>
                          <span className="icon">
                            <i className="fas fa-check"></i>
                          </span>
                          <span>Enviado</span>
                        </button>
                      )}
                    </div>
                  )}
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

export default DeliverablesView;
