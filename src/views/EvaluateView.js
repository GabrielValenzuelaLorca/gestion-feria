import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getActivity } from "../services/activity";
import { Fragment } from "react";
import Textarea from "../components/Forms/Textarea";
import useForm from "../hooks/useForm";
import { Form } from "../components/Forms";

const EvaluateView = () => {
  const { activityId, teamId } = useParams();
  const [activityState, setActivity] = useState({});
  const [evaluationState, setEvaluation] = useState({});
  const [fetchActivity, isLoading] = useFetch(getActivity, setActivity);
  const navigate = useNavigate();
  const form = useForm(evaluationState, setEvaluation);

  useEffect(() => {
    fetchActivity(activityId);
  }, [fetchActivity, activityId]);

  useEffect(() => {
    if (activityState.rubric) {
      const state = {
        rows: [],
        score: 0,
        feedback: "",
      };
      activityState.rubric.rows.forEach((row) => {
        state.rows.push({
          index: 0,
          score: row.columns[0].score,
        });
        state.score += row.columns[0].score;
      });
      setEvaluation(state);
    }
  }, [activityState.rubric]);

  const handlePunctuateButton = (row, column, score) => {
    setEvaluation((state) => {
      const newState = { ...state };
      newState.rows[row].index = column;
      newState.rows[row].score = score;
      const newScore = newState.rows.reduce((prev, acc) => prev + acc.score, 0);
      newState.score = newScore;
      return newState;
    });
  };

  // const handleSendRubric = async () => {
  //   await doCreateRubric(activityId, rows);
  //   navigate(`/actividades`);
  // };

  // const handleUpdateRubric = async () => {
  //   await doUpdateRubric(activityId, {
  //     id: activityState.rubric.id,
  //     rows,
  //   });
  //   navigate(`/actividades`);
  // };

  return (
    <section className="section">
      {isLoading ? (
        <progress className="progress is-primary" />
      ) : (
        <>
          <header className="block">
            <h1 className="title is-4">{activityState.name}</h1>
            <h2 className="subtitle is-6">{activityState.description}</h2>
            {evaluationState.score && (
              <div className="block tags has-addons">
                <span className="tag is-medium is-primary">Nota final</span>
                <span className="tag is-medium is-primary is-light">
                  {evaluationState.score}
                </span>
              </div>
            )}
            {activityState.rubric &&
              (evaluationState.id ? (
                <button
                  className={`button is-link ${"is-loading"}`}
                  type="button"
                  // onClick={handleUpdateRubric}
                  // disabled={loadingUpdate}
                >
                  <span className="icon is-small">
                    <i className="fas fa-check" aria-hidden="true" />
                  </span>
                  <span>Actualizar Evaluación</span>
                </button>
              ) : (
                <button
                  className={`button is-success ${"is-loading"}`}
                  type="button"
                  // onClick={handleSendRubric}
                  // disabled={loadingCreate}
                >
                  <span className="icon is-small">
                    <i className="fas fa-check" aria-hidden="true" />
                  </span>
                  <span>Crear Evaluación</span>
                </button>
              ))}
          </header>
          <section>
            {activityState.rubric ? (
              <>
                {activityState.rubric.rows.map(({ criteria, columns }, i) => (
                  <Fragment key={i}>
                    <h3 className="subtitle">{criteria}</h3>
                    <div className="columns is-variable is-1">
                      {columns.map(({ description, score }, j) => (
                        <div className="column" key={`${i}-column-${j}`}>
                          <div className="box">
                            <div className="block ml-2">{description}</div>
                            <button
                              className="button is-primary is-small is-rounded"
                              disabled={evaluationState.rows[i].index === j}
                              onClick={() => handlePunctuateButton(i, j, score)}
                            >
                              {score} Puntos
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="column is-narrow">
                        <div className="tags has-addons">
                          <span className="tag is-primary is-light is-medium">
                            {evaluationState.rows[i].score}
                          </span>
                          <span className="tag is-primary is-medium">
                            Puntos
                          </span>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <h3 className="subtitle">Comentarios</h3>
                <Form form={form}>
                  <Textarea
                    name="feedback"
                    placeholder="Ingrese su comentario"
                  />
                </Form>
              </>
            ) : (
              <p className="notification">
                No hay rúbrica para realizar esta evaluación
              </p>
            )}
          </section>
        </>
      )}
    </section>
  );
};

export default EvaluateView;
