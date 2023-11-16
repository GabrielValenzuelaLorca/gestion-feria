import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import { evaluate, getDeliverableById } from "../services/deliverable";
import { getTeam } from "../services/team";
import { useSelector } from "react-redux";
import EvaluateRubric from "../components/Evaluate/EvaluateRubric";
import EvaluateSprint from "../components/Evaluate/EvaluateSprint";

const EvaluateView = () => {
  const { deliverableId } = useParams();
  const [deliverableState, setDeliverable] = useState({});
  const [teamState, setTeam] = useState({});
  const [evaluationState, setEvaluation] = useState({});
  const [fetchDeliverable, isLoading] = useFetch(
    getDeliverableById,
    setDeliverable
  );
  const [fetchTeam] = useFetch(getTeam, setTeam);
  const [doEvaluation, loadingEvaluation] = useFetch(evaluate, null, true);
  const navigate = useNavigate();
  const form = useForm(evaluationState, setEvaluation);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchDeliverable(deliverableId);
  }, [deliverableId, fetchDeliverable]);

  useEffect(() => {
    if (deliverableState.team) {
      fetchTeam(deliverableState.team);
    }
  }, [fetchTeam, deliverableState.team]);

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
                  {deliverableState.activity.type !== "sprint" &&
                    evaluationState.score !== undefined && (
                      <div className="block">
                        <strong>Nota final:</strong> {evaluationState.score}
                      </div>
                    )}
                  {deliverableState.activity.evaluators.includes(user.id) &&
                    (deliverableState.activity.type === "sprint" ||
                      deliverableState.activity.rubric) && (
                      <button
                        className={`button is-success ${
                          loadingEvaluation && "is-loading"
                        }`}
                        type="button"
                        onClick={handleEvaluate}
                        disabled={
                          loadingEvaluation ||
                          !deliverableState.activity.evaluators.includes(
                            user.id
                          )
                        }
                      >
                        <span className="icon is-small">
                          <i className="fas fa-check" aria-hidden="true" />
                        </span>
                        <span>Terminar Evaluación</span>
                      </button>
                    )}
                </div>
              </div>
            </header>
            {deliverableState.activity.type !== "sprint" ? (
              <EvaluateRubric
                deliverable={deliverableState}
                user={user}
                evaluation={evaluationState}
                setEvaluation={setEvaluation}
                form={form}
              />
            ) : (
              <EvaluateSprint
                deliverable={deliverableState}
                user={user}
                evaluation={evaluationState}
                setEvaluation={setEvaluation}
              />
            )}
          </>
        )
      )}
    </section>
  );
};

export default EvaluateView;
