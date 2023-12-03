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
import { useNavigate } from "react-router-dom";

const DeliverablesView = () => {
  const user = useSelector((state) => state.user);
  const [deliverablesState, setDeliverables] = useState([]);
  const [fetchDeliverables, isLoadingDeliverables] = useFetch(
    getDeliverablesByTeam,
    setDeliverables
  );
  const [fetchCreateDeliverable, isLoadingCreate] = useFetch(createDeliverable);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.team.id) fetchDeliverables(user.team.id);
  }, [fetchDeliverables, user.team.id]);

  const handleEndButton = async (activity_id) => {
    await fetchCreateDeliverable(activity_id);
    await fetchDeliverables(user.team.id);
  };

  const handleEvaluation = (deliverableId) => {
    navigate(`/evaluacion/${deliverableId}`);
  };

  const handleRubric = (activityId) => {
    navigate(`/rubrica/${activityId}`);
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

                    <div className="field is-grouped is-grouped-multiline">
                      {activity.state === "pending" ? (
                        <>
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
                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-primary is-rounded">
                                Tiempo restante
                              </span>
                              <span className="tag is-primary is-light is-rounded">
                                {diffDates(new Date(), activity.end)} días
                              </span>
                            </div>
                          </div>
                        </>
                      ) : activity.state === "pending_delayed" ? (
                        <>
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
                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-primary is-rounded">
                                Tiempo de atraso restante
                              </span>
                              <span className="tag is-primary is-light is-rounded">
                                {diffDates(new Date(), activity.close)} días
                              </span>
                            </div>
                          </div>
                        </>
                      ) : activity.state === "closed" ? (
                        <div className="control">
                          <span className="tag is-primary is-rounded">
                            No entregado
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-primary is-rounded">
                                Fecha de envío
                              </span>
                              <span className="tag is-primary is-light is-rounded">
                                {formatDatetimeToString(activity.send_date)}
                              </span>
                            </div>
                          </div>
                          <div className="control">
                            <div className="tags has-addons">
                              <span className="tag is-primary is-rounded">
                                Estado de envío
                              </span>
                              <span className="tag is-primary is-light is-rounded">
                                {activity.state === "done"
                                  ? "A tiempo"
                                  : "Atrasado"}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {activity.state !== "closed" && (
                    <div className="column is-narrow buttons">
                      <button
                        className="button is-primary"
                        onClick={() => handleRubric(activity.id)}
                        disabled={!activity.rubric}
                      >
                        <span className="icon is-small">
                          <i className="fa-solid fa-eye"></i>
                        </span>
                        {activity.rubric ? (
                          <span>Ver Rúbrica</span>
                        ) : (
                          <span className="is-italic">Sin Rúbrica</span>
                        )}
                      </button>

                      {activity.state === "evaluated" && (
                        <button
                          className="button is-primary is-outlined"
                          onClick={() =>
                            handleEvaluation(activity.deliverable_id)
                          }
                        >
                          <span className="icon is-small">
                            <i className="fa-solid fa-eye"></i>
                          </span>
                          <span>Ver Evaluación</span>
                        </button>
                      )}
                      {activity.type === "document" ? (
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
