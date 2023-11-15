import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getStoriesBySprint } from "../../services/story";
import { getUsers } from "../../services/user";
import { Fragment } from "react";

const EvaluateSprint = ({ deliverable, user, evaluation, setEvaluation }) => {
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

  useEffect(() => {
    fetchEvaluators({
      roles: ["Profesor", "Ayudante", "Juez"],
      active: true,
    });
  }, [fetchEvaluators]);

  useEffect(() => {
    if (deliverable.activity && deliverable.team) {
      fetchStories(deliverable.activity.name, deliverable.team);
    }
  }, [deliverable.activity, deliverable.team, fetchStories]);

  useEffect(() => {
    if (deliverable.evaluation) {
      setEvaluation(deliverable.evaluation);
    }
  }, [deliverable.evaluation, setEvaluation]);

  return (
    <section>
      {loadingEvaluators || loadingStories ? (
        <progress className="progress is-primary"></progress>
      ) : storiesState.length > 0 ? (
        Object.keys(evaluation.stories).map((storyId) => {
          const story = storiesState.find((story) => story.id === storyId);
          return (
            <Fragment key={storyId}>
              <h1 className="subtitle mb-1">
                HU {story.number}: <strong>{story.title}</strong>{" "}
                <span className="is-size-6">({story.points} Puntos)</span>
              </h1>
              <h2 className="subtitle is-6">{story.description}</h2>
              {story.criteria.map((criteria) => (
                <div className="box columns mb-6">
                  <div className="column is-8">{criteria}</div>
                  <div className="column is-1">
                    <div className="field">
                      <label>Puntaje</label>
                      <div className="control">
                        <input
                          className="input is-success is-medium"
                          type="number"
                          min={0}
                          max={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column is-3">
                    <div className="field">
                      <label>Comentarios</label>
                      <div className="control">
                        <textarea
                          className="textarea is-small is-primary"
                          placeholder="Ingrese su comentario"
                          rows={2}
                          // value={""}
                          // onChange={(e) =>
                          //   handleOnChange(i, null, e.target.value)
                          // }
                        />
                      </div>
                    </div>
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
  );
};

export default EvaluateSprint;
