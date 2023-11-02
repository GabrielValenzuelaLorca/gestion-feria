import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { getDeliverablesByActivity } from "../services/evaluation";
import { DELIVERABLE_STATE } from "../utils/constants";
import { formatDatetimeToString } from "../utils/functions";

const EvaluationsView = () => {
  const { activityId } = useParams();
  const [deliverablesState, setDeliverables] = useState([]);
  const [activityState, setActivity] = useState({});

  const fetchCallback = useCallback((data) => {
    setDeliverables(data.deliverables);
    setActivity(data.activity);
  }, []);

  const [fetchEvaluations, isLoading] = useFetch(
    getDeliverablesByActivity,
    fetchCallback
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvaluations(activityId);
  }, [fetchEvaluations, activityId]);

  const handleRubricButton = (activityId) => {
    navigate(`/rubrica/${activityId}`);
  };

  const handleEvaluationButton = (deliverableId) => {
    navigate(`/evaluacion/${deliverableId}`);
  };

  return (
    <section className="section">
      <section className="container">
        {isLoading ? (
          <progress className="progress is-primary" />
        ) : (
          <>
            <h1 className="title is-3">
              Estado de actividad: {activityState.name}
            </h1>
            {activityState.id && (
              <article className="message is-primary">
                <div className="message-body">
                  <div className="block">
                    <h2 className="is-size-6">
                      <strong>Fecha de inicio:</strong>{" "}
                      {formatDatetimeToString(activityState.start)}
                    </h2>
                    <h2 className="is-size-6">
                      <strong>Fecha de término: </strong>
                      {formatDatetimeToString(activityState.end)}
                    </h2>
                    {activityState.delay && (
                      <h2 className="is-size-6">
                        <strong>Fecha de cierre:</strong>{" "}
                        {formatDatetimeToString(activityState.close)}
                      </h2>
                    )}
                    {deliverablesState.length && (
                      <h2 className="is-size-6">
                        <strong>Estado de envíos:</strong>{" "}
                        {
                          deliverablesState.filter((deliverable) =>
                            ["done", "evaluated"].includes(deliverable.state)
                          ).length
                        }{" "}
                        de {deliverablesState.length}
                      </h2>
                    )}
                  </div>
                  {
                    <div className="block">
                      <button
                        className={`button ${
                          activityState.rubric ? "is-link" : "is-success"
                        }`}
                        onClick={() => handleRubricButton(activityState.id)}
                      >
                        <span className="icon is-small">
                          <i
                            className={`fa-solid ${
                              activityState.rubric ? "fa-eye" : "fa-plus"
                            } `}
                          ></i>
                        </span>
                        <span>
                          {activityState.rubric
                            ? "Ver Rúbrica"
                            : "Crear Rúbrica"}
                        </span>
                      </button>
                    </div>
                  }
                </div>
              </article>
            )}
            {deliverablesState.length ? (
              deliverablesState.map((deliverable, index) => {
                return (
                  <div key={index} className="box">
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <span>
                            Equipo: <strong>{deliverable.team.name}</strong> |
                            Proyecto:{" "}
                            <strong>{deliverable.team.project.name}</strong>
                          </span>
                        </div>
                      </div>
                      <div className="level-right">
                        <div
                          className={`level-item tag is-rounded ${
                            DELIVERABLE_STATE[deliverable.state].color
                          }`}
                        >
                          {deliverable.state === "evaluated"
                            ? `${DELIVERABLE_STATE[deliverable.state].text}: ${
                                deliverable.evaluation.score
                              }`
                            : DELIVERABLE_STATE[deliverable.state].text}
                        </div>
                        <div className="level-item">
                          <button
                            className="button is-primary"
                            onClick={() =>
                              handleEvaluationButton(deliverable.id)
                            }
                            disabled={
                              !["done", "evaluated"].includes(
                                deliverable.state
                              ) || !activityState.rubric
                            }
                          >
                            <span className="icon is-small">
                              <i className="fa-solid fa-check"></i>
                            </span>
                            <span>
                              {activityState.rubric ? "Evaluar" : "Sin Rúbrica"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="notification">No hay entregables en este momento</p>
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default EvaluationsView;
