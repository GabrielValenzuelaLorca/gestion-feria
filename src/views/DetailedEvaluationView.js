import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getDeliverableById } from "../services/deliverable";
import useFetch from "../hooks/useFetch";
import { getTeam } from "../services/team";
import { useSelector } from "react-redux";
import { getStoriesBySprint } from "../services/story";
import { getUsers } from "../services/user";

const DetailedEvaluationView = () => {
  const { deliverableId } = useParams();
  const [deliverableState, setDeliverable] = useState({});
  const [teamState, setTeam] = useState({});
  const [evaluationState, setEvaluation] = useState({});
  const [storiesState, setStories] = useState([]);
  const [evaluatorsState, setEvaluators] = useState([]);
  const [fetchStories, loadingStories] = useFetch(
    getStoriesBySprint,
    setStories
  );
  const [fetchEvaluators, loadingEvaluators] = useFetch(
    getUsers,
    setEvaluators
  );
  const [fetchDeliverable, isLoading] = useFetch(
    getDeliverableById,
    setDeliverable
  );
  const [fetchTeam] = useFetch(getTeam, setTeam);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchDeliverable(deliverableId);
  }, [deliverableId, fetchDeliverable]);

  useEffect(() => {
    if (!teamState.id) {
      if (user.team.id && user.rol === "Alumno") {
        setTeam(user.team);
      } else if (deliverableState.team) {
        fetchTeam(deliverableState.team);
      }
    }
  }, [deliverableState.team, fetchTeam, teamState.id, user.rol, user.team]);

  useEffect(() => {
    fetchEvaluators({
      roles: ["Profesor", "Ayudante", "Juez"],
      active: true,
    });
  }, [fetchEvaluators]);

  useEffect(() => {
    if (deliverableState.activity && deliverableState.team) {
      fetchStories(deliverableState.activity.name, deliverableState.team);
    }
  }, [deliverableState.activity, deliverableState.team, fetchStories]);

  useEffect(() => {
    if (deliverableState.evaluation) {
      setEvaluation(deliverableState.evaluation);
    }
  }, [deliverableState.evaluation, setEvaluation]);

  const selectedEvaluators = useMemo(() => {
    if (deliverableState.activity) {
      return evaluatorsState.filter((evaluator) =>
        deliverableState.activity.evaluators.includes(evaluator.id)
      );
    }
    return [];
  }, [deliverableState.activity, evaluatorsState]);

  return (
    <section className="section">
      {isLoading ? (
        <progress className="progress is-primary" />
      ) : (
        deliverableState.activity && (
          <>
            <header className="container mb-6">
              <h1 className="title">
                Evaluación: {deliverableState.activity.name}
              </h1>
              {teamState.id && (
                <h2 className="subtitle">
                  Equipo: <strong>{teamState.name}</strong> | Proyecto:{" "}
                  <span
                    className={`${
                      teamState.project.name
                        ? "has-text-weight-bold"
                        : "is-italic"
                    }`}
                  >
                    {teamState.project.name || "Sin Proyecto"}
                  </span>
                </h2>
              )}
              <div className="message is-primary">
                <div className="message-body">
                  <h2 className="subtitle is-6">
                    {deliverableState.activity.description}
                  </h2>

                  <div className="block">
                    <strong>Nota final:</strong> {evaluationState.score}
                  </div>
                </div>
              </div>
            </header>
            <section>
              {loadingEvaluators || loadingStories ? (
                <progress className="progress is-primary"></progress>
              ) : storiesState.length > 0 ? (
                Object.keys(evaluationState.stories).map((storyId) => {
                  const story = storiesState.find(
                    (story) => story.id === storyId
                  );
                  return (
                    <Fragment key={storyId}>
                      <div className="message is-primary mb-0">
                        <div className="message-body">
                          <h1 className="subtitle mb-1">
                            HU {story.number}: <strong>{story.title}</strong>{" "}
                            <span className="is-size-6">
                              ({story.points} Puntos)
                            </span>
                          </h1>
                        </div>
                      </div>
                      <div
                        className="box columns pb-0"
                        style={{
                          backgroundColor: "transparent",

                          boxShadow: "none",
                        }}
                      >
                        <div
                          className={`column is-${
                            10 - selectedEvaluators.length
                          }`}
                        >
                          <h2
                            className="subtitle is-6"
                            style={{ width: "100%" }}
                          >
                            {story.description}
                          </h2>
                        </div>
                        {selectedEvaluators.map((evaluator) => (
                          <div
                            className="column is-1 is-justify-content-center is-flex is-align-items-flex-end"
                            key={evaluator.id}
                          >
                            <p className="tag is-primary is-size-6">
                              {evaluator.name} {evaluator.lastName}
                            </p>
                          </div>
                        ))}
                        <div className="column is-2"></div>
                      </div>
                      {story.criteria.map((criteria, i) => (
                        <div
                          className="box columns mb-6"
                          key={`${storyId}-criteria-${i}`}
                        >
                          <div
                            className={`column is-${
                              10 - selectedEvaluators.length
                            }`}
                          >
                            {criteria}
                          </div>
                          {selectedEvaluators.map((evaluator, j) => (
                            <div
                              className="column is-1 has-text-centered"
                              key={`${storyId}-criteria-${i}-score-${j}`}
                            >
                              <p className="tag is-success is-large is-rounded">
                                {
                                  evaluationState.stories[storyId][i][
                                    evaluator.id
                                  ].score
                                }{" "}
                                / 4
                              </p>
                            </div>
                          ))}
                          <div className="content column is-2">
                            <span className="has-text-weight-semibold">
                              Comentarios:
                            </span>
                            <ul>
                              {(() => {
                                const feedbackArray = [];
                                selectedEvaluators.forEach((evaluator) => {
                                  const feedback =
                                    evaluationState.stories[storyId][i][
                                      evaluator.id
                                    ].feedback;
                                  if (feedback !== "") {
                                    feedbackArray.push(feedback);
                                  }
                                });
                                return feedbackArray.length === 0 ? (
                                  <li className="is-italic">Sin Comentarios</li>
                                ) : (
                                  feedbackArray.map((feedback) => (
                                    <li>{feedback}</li>
                                  ))
                                );
                              })()}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  );
                })
              ) : (
                <p className="notification">
                  Este equipo no posee historias para el sprint
                </p>
              )}
            </section>
          </>
        )
      )}
    </section>
  );
};

export default DetailedEvaluationView;
