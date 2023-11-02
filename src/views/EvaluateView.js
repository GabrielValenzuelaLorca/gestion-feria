import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Fragment } from "react";
import Textarea from "../components/Forms/Textarea";
import useForm from "../hooks/useForm";
import { Form } from "../components/Forms";
import { evaluate, getDeliverableById } from "../services/deliverable";

const EvaluateView = () => {
  const { deliverableId } = useParams();
  const [deliverableState, setDeliverable] = useState({});
  const [evaluationState, setEvaluation] = useState({});
  const [fetchDeliverable, isLoading] = useFetch(
    getDeliverableById,
    setDeliverable
  );
  const [doEvaluation, loadingEvaluation] = useFetch(evaluate, null, true);
  const navigate = useNavigate();
  const form = useForm(evaluationState, setEvaluation);

  useEffect(() => {
    fetchDeliverable(deliverableId);
  }, [deliverableId, fetchDeliverable]);

  useEffect(() => {
    if (deliverableState.activity && deliverableState.activity.rubric) {
      if (deliverableState.evaluation) {
        setEvaluation(deliverableState.evaluation);
      } else {
        const state = {
          rows: [],
          score: 0,
          feedback: "",
        };
        deliverableState.activity.rubric.forEach((row) => {
          state.rows.push({
            index: 0,
            score: row.columns[0].score,
          });
          state.score += row.columns[0].score;
        });
        setEvaluation(state);
      }
    }
  }, [deliverableState.activity, deliverableState.evaluation]);

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

  const handleEvaluate = async () => {
    await doEvaluation(deliverableId, evaluationState);
    navigate(`/entregables/${deliverableState.activity.id}`);
  };

  return (
    <section className="section">
      {isLoading ? (
        <progress className="progress is-primary" />
      ) : (
        deliverableState.activity && (
          <>
            <header className="container">
              <h1 className="title is-3">
                Evaluación: {deliverableState.activity.name}
              </h1>
              <div className="message is-primary ">
                <div className="message-body">
                  <h2 className="subtitle is-6">
                    {deliverableState.activity.description}
                  </h2>
                  {evaluationState.score && (
                    <div className="block">
                      <strong>Nota final:</strong> {evaluationState.score}
                    </div>
                  )}
                  {deliverableState.activity.rubric && (
                    <button
                      className={`button ${loadingEvaluation && "is-loading"} ${
                        deliverableState.evaluation ? "is-link" : "is-success"
                      }`}
                      type="button"
                      onClick={handleEvaluate}
                      disabled={loadingEvaluation}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-check" aria-hidden="true" />
                      </span>
                      <span>
                        {deliverableState.evaluation ? "Editar" : "Crear"}{" "}
                        Evaluación
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </header>
            <section>
              {deliverableState.activity.rubric ? (
                <>
                  {deliverableState.activity.rubric.map(
                    ({ criteria, columns }, i) => (
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
                                  onClick={() =>
                                    handlePunctuateButton(i, j, score)
                                  }
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
                    )
                  )}
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
        )
      )}
    </section>
  );
};

export default EvaluateView;
