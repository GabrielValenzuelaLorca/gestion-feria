import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getStoriesBySprint } from "../../services/story";
import { Fragment } from "react";

const EvaluateSprint = ({ deliverable, user, evaluation, setEvaluation }) => {
  const [storiesState, setStories] = useState([]);
  const [fetchStories, loadingStories] = useFetch(
    getStoriesBySprint,
    setStories
  );

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

  const handleScore = (storyId, criteriaIndex, e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 4) {
      setEvaluation((evaluation) => {
        const newState = { ...evaluation };
        newState.stories[storyId][criteriaIndex][user.id].score = value;
        return newState;
      });
    }
  };

  const handleFeedback = (storyId, criteriaIndex, e) => {
    const value = e.target.value;
    setEvaluation((evaluation) => {
      const newState = { ...evaluation };
      newState.stories[storyId][criteriaIndex][user.id].feedback = value;
      return newState;
    });
  };

  return (
    <section>
      {loadingStories ? (
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
              {story.criteria.map((criteria, i) => (
                <div
                  className="box columns mb-6"
                  key={`${storyId}-criteria-${i}`}
                >
                  <div className="column is-8">{criteria}</div>
                  <div className="column is-1">
                    <div className="field">
                      <label>Puntaje</label>
                      <div className="control">
                        <input
                          className="input is-success is-medium"
                          type="number"
                          value={evaluation.stories[storyId][i][user.id].score}
                          min={0}
                          max={4}
                          placeholder="4"
                          onChange={(e) => handleScore(storyId, i, e)}
                          disabled={
                            !deliverable.activity.evaluators.includes(user.id)
                          }
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
                          value={
                            evaluation.stories[storyId][i][user.id].feedback
                          }
                          onChange={(e) => handleFeedback(storyId, i, e)}
                          disabled={
                            !deliverable.activity.evaluators.includes(user.id)
                          }
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
