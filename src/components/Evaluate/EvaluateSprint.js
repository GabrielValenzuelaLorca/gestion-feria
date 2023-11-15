import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getStoriesBySprint } from "../../services/story";

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
    if (deliverable.activity && storiesState.length > 0) {
      if (deliverable.evaluation) {
        setEvaluation(deliverable.evaluation);
      } else {
        const state = {
          rows: [],
          score: 0,
          feedback: "",
        };
        deliverable.activity.rubric.forEach((row) => {
          state.rows.push({
            index: 0,
            score: row.columns[0].score,
          });
          state.score += row.columns[0].score;
        });
        setEvaluation(state);
      }
    }
  }, [deliverable.activity, deliverable.evaluation, setEvaluation]);

  return <section></section>;
};

export default EvaluateSprint;
