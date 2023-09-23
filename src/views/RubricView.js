import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getActivity } from "../services/activity";
import { createRubric, updateRubric } from "../services/rubric";

const defaultState = {
  criteria: "",
  columns: [
    {
      description: "",
      score: 0,
    },
  ],
};

const RubricView = () => {
  const { activityId } = useParams();
  const [activityState, setActivity] = useState({});
  const [rows, setRows] = useState([defaultState]);
  const [fetchActivity, isLoading] = useFetch(getActivity, setActivity);
  const [doCreateRubric, loadingCreate] = useFetch(createRubric, null, true);
  const [doUpdateRubric, loadingUpdate] = useFetch(updateRubric, null, true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivity(activityId);
  }, [fetchActivity, activityId]);

  useEffect(() => {
    if (activityState.rubric) setRows(activityState.rubric.rows);
  }, [activityState.rubric]);

  const addRow = () => {
    setRows((state) => [
      ...state,
      {
        criteria: "",
        columns: [
          {
            description: "",
            score: 0,
          },
        ],
      },
    ]);
  };

  const addColumn = (row) => {
    if (rows[row].columns.length < 10) {
      const newState = [...rows];
      newState[row].columns.push({
        description: "",
        score: 0,
      });
      setRows(newState);
    }
  };

  const deleteRow = (row) => {
    const newState = [...rows];
    if (newState[row].columns.length > 1) newState[row].columns.pop();
    else newState.splice(row, 1);
    setRows(newState);
  };

  const handleOnChange = (row, column, value, type) => {
    const newState = [...rows];
    if (column === null) newState[row].criteria = value;
    else {
      newState[row].columns[column][type] =
        type === "score" ? parseInt(value) : value;
    }
    setRows(newState);
  };

  const handleSendRubric = async () => {
    await doCreateRubric(activityId, rows);
    navigate(`/actividades`);
  };

  const handleUpdateRubric = async () => {
    await doUpdateRubric(activityId, {
      id: activityState.rubric.id,
      rows,
    });
    navigate(`/actividades`);
  };

  return (
    <section className="section">
      {isLoading ? (
        <progress className="progress is-primary" />
      ) : (
        <>
          <header className="block">
            <h1 className="title is-4">{activityState.name}</h1>
            <h2 className="subtitle is-6">{activityState.description}</h2>
            {activityState.rubric ? (
              <button
                className={`button is-link ${loadingUpdate && "is-loading"}`}
                type="button"
                onClick={handleUpdateRubric}
                disabled={loadingUpdate}
              >
                <span className="icon is-small">
                  <i className="fas fa-check" aria-hidden="true" />
                </span>
                <span>Actualizar Rúbrica</span>
              </button>
            ) : (
              <button
                className={`button is-success ${loadingCreate && "is-loading"}`}
                type="button"
                onClick={handleSendRubric}
                disabled={loadingCreate}
              >
                <span className="icon is-small">
                  <i className="fas fa-check" aria-hidden="true" />
                </span>
                <span>Guardar Rúbrica</span>
              </button>
            )}
          </header>
          <form>
            {rows.map(({ criteria, columns }, i) => (
              <div className="columns is-variable is-1" key={i}>
                <div className="column">
                  <div className="box">
                    <div className="field">
                      <label className="label">Criterio {i + 1}:</label>
                      <div className="control">
                        <textarea
                          className="textarea is-small"
                          placeholder="Ingrese descripción del criterio"
                          value={criteria}
                          onChange={(e) =>
                            handleOnChange(i, null, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {columns.map(({ description, score }, j) => (
                  <div className="column" key={`${i}-column-${j}`}>
                    <div className="box">
                      <div className="field">
                        <label className="label">Puntaje {j + 1}:</label>
                        <div className="control">
                          <textarea
                            className="textarea is-small"
                            placeholder="Ingrese descripción del puntaje"
                            value={description}
                            onChange={(e) =>
                              handleOnChange(
                                i,
                                j,
                                e.target.value,
                                "description"
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="field">
                        <label className="label">Puntuación:</label>
                        <div className="control">
                          <input
                            className="input is-small is-rounded"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            value={score}
                            onChange={(e) =>
                              handleOnChange(i, j, e.target.value, "score")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="column is-narrow ">
                  <button
                    className="button is-primary"
                    type="button"
                    onClick={() => addColumn(i)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus" aria-hidden="true" />
                    </span>
                  </button>
                </div>

                <div className="column is-narrow">
                  <button
                    className="button is-danger"
                    type="button"
                    onClick={() => deleteRow(i)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-trash" aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
            <button
              className="button is-primary"
              type="button"
              onClick={addRow}
            >
              <span className="icon is-small">
                <i className="fas fa-plus" aria-hidden="true" />
              </span>
              <span>Añadir Criterio</span>
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default RubricView;
