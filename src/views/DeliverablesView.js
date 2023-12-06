import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { diffDates, formatDatetimeToString } from "../utils/functions";
import {
  createDeliverable,
  getDeliverablesByTeam,
} from "../services/deliverable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAppActivities } from "../services/activity";
import { setActivities } from "../store/slices/activitiesSlice";
import { updateSettings } from "../store/slices/settingsSlice";
import Loader from "../components/Loader";

const DeliverablesView = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [deliverablesState, setDeliverables] = useState([]);
  const [fileState, setFile] = useState();
  const [fetchDeliverables, isLoadingDeliverables] = useFetch(
    getDeliverablesByTeam,
    setDeliverables
  );
  const [fetchCreateDeliverable, isLoadingCreate] = useFetch(createDeliverable);
  const [fetchAppActivities, isLoadingActivities] = useFetch(
    getAppActivities,
    useCallback(
      (activities) => {
        dispatch(setActivities(activities));
        dispatch(updateSettings(activities));
      },
      [dispatch]
    )
  );
  const navigate = useNavigate();

  const loading =
    isLoadingDeliverables || isLoadingCreate || isLoadingActivities;

  useEffect(() => {
    if (user.team.id) fetchDeliverables(user.team.id);
  }, [fetchDeliverables, user.team.id]);

  const handleEndButton = async (activity_id) => {
    await fetchCreateDeliverable(activity_id, fileState);
    await fetchDeliverables(user.team.id);
    await fetchAppActivities();
  };

  const handleFileButton = (e) => {
    const files = e.target.files;
    if (files.length > 0) setFile(files[0]);
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
        <Loader loading={loading}>
          {deliverablesState.length ? (
            deliverablesState.map((activity) => {
              return (
                <div key={activity.id} className="box">
                  <div className="columns">
                    <div className="column">
                      <h1 className="title is-4">{activity.name}</h1>
                      <p className="subtitle is-6">{activity.description}</p>

                      <div className="field is-grouped is-grouped-multiline">
                        {activity.state === "pending" && !activity.delayed ? (
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
                        ) : activity.state === "pending" && activity.delayed ? (
                          <>
                            <div className="control">
                              <div className="tags has-addons">
                                <span className="tag is-primary is-rounded">
                                  Fecha de cierre
                                </span>
                                <span className="tag is-primary is-light is-rounded">
                                  {activity.close
                                    .split("/")
                                    .reverse()
                                    .join("/")}
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
                                  {activity.delayed ? "Atrasado" : "A tiempo"}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {activity.state !== "closed" && (
                      <div className="column is-narrow">
                        {activity.type === "document" && (
                          <div className="block">
                            <div className="file has-name is-boxed is-centered">
                              <label className="file-label">
                                <input
                                  className="file-input"
                                  type="file"
                                  name="file"
                                  onChange={handleFileButton}
                                />
                                <span className="file-cta">
                                  <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                  </span>
                                  <span className="file-label">
                                    Seleccionar archivo
                                  </span>
                                </span>
                                {fileState && (
                                  <span className="file-name">
                                    {fileState.name}
                                  </span>
                                )}
                              </label>
                            </div>
                          </div>
                        )}
                        <div className="buttons">
                          {activity.state === "evaluated" ? (
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
                          ) : (
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
                          )}
                          {activity.state === "pending" ? (
                            <button
                              className="button is-success is-pulled-right"
                              onClick={() => handleEndButton(activity.id)}
                              disabled={
                                activity.type === "document" && !fileState
                              }
                            >
                              Terminar Actividad
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
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="notification">
              {user.team.id
                ? "No hay actividades por realizar en este momento"
                : "Debes pertenecer a un equipo para enviar entregables"}
            </p>
          )}
        </Loader>
      </section>
    </section>
  );
};

export default DeliverablesView;
