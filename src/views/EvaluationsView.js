import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { getEvaluationsByActivity } from "../services/evaluation";

const EvaluationsView = () => {
  const { activityId } = useParams();
  const [evaluationsState, setEvaluations] = useState([]);
  const [activityState, setActivity] = useState({});

  const fetchCallback = useCallback((data) => {
    setEvaluations(data.evaluations);
    setActivity(data.activity);
  }, []);

  const [fetchEvaluations, isLoading] = useFetch(
    getEvaluationsByActivity,
    fetchCallback
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvaluations(activityId);
  }, [fetchEvaluations, activityId]);

  const handleEvaluationButton = (activityId) => {
    navigate(`/rubrica/${activityId}`);
  };

  return (
    <section className="section">
      <section className="container">
        {isLoading ? (
          <progress className="progress is-primary" />
        ) : (
          <>
            <h1 className="title is-3">
              Evaluaciones Actividad: {activityState.name}
            </h1>
            {evaluationsState.length ? (
              evaluationsState.map((evaluation, index) => {
                return (
                  <div key={index} className="box">
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">
                          {evaluation.name} / {evaluation.project.name}
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          {evaluation.evaluation_id
                            ? `Nota: ${evaluation.score || "-"}`
                            : "Sin Evaluar"}
                        </div>
                        <div className="level-item">
                          <button className="button is-primary">
                            <span className="icon is-small">
                              <i className="fa-solid fa-check"></i>
                            </span>
                            <span>Evaluar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="notification">
                No hay evaluaciones en este momento
              </p>
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default EvaluationsView;
