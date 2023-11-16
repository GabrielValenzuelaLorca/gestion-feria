import React, { Fragment, useEffect } from "react";
import { Form, Textarea } from "../Forms";

const EvaluateRubric = ({
  deliverable,
  user,
  evaluation,
  setEvaluation,
  form,
}) => {
  useEffect(() => {
    if (deliverable.activity && deliverable.activity.rubric) {
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

  return (
    <section>
      {deliverable.activity.rubric ? (
        <>
          {evaluation.rows &&
            deliverable.activity.rubric.map(({ criteria, columns }, i) => (
              <Fragment key={i}>
                <h3 className="subtitle">{criteria}</h3>
                <div className="columns is-variable is-1">
                  {columns.map(({ description, score }, j) => (
                    <div className="column" key={`${i}-column-${j}`}>
                      <div className="box">
                        <div className="block ml-2">{description}</div>
                        {user.rol === "Profesor" &&
                        deliverable.activity.evaluators.includes(user.id) ? (
                          <button
                            className="button is-primary is-small is-rounded"
                            disabled={evaluation.rows[i].index === j}
                            onClick={() => handlePunctuateButton(i, j, score)}
                          >
                            {score} Puntos
                          </button>
                        ) : (
                          <span
                            className={`tag is-small is-rounded ${
                              evaluation.rows[i].index === j
                                ? "is-success"
                                : "is-grey"
                            }`}
                          >
                            {score} Puntos
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="column is-narrow">
                    <div className="tags has-addons">
                      <span className="tag is-primary is-light is-medium">
                        {evaluation.rows[i].score}
                      </span>
                      <span className="tag is-primary is-medium">Puntos</span>
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
              disabled={
                user.rol === "Alumno" ||
                !deliverable.activity.evaluators.includes(user.id)
              }
            />
          </Form>
        </>
      ) : (
        <p className="notification mt-4">
          No hay rúbrica para realizar esta evaluación
        </p>
      )}
    </section>
  );
};

export default EvaluateRubric;
