import React, { useState, useMemo, useEffect } from "react";
import useForm from "../../hooks/useForm";
import { createActivity, editActivity } from "../../services/activity";
import { ACTIVITIES_TYPES, CAMPUS, SPRINTS } from "../../utils/constants";
import { diffDates } from "../../utils/functions";
import { Checkbox, Form, Input, Select, Textarea } from "../Forms";

const ActivityForm = ({
  isActive,
  closeModal,
  currentActivity,
  setCurrentActivity,
  evaluators,
  loadingEvaluators,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm(currentActivity, setCurrentActivity);

  const evaluatorsAsOptions = useMemo(
    () =>
      evaluators
        .filter((evaluator) => {
          const condition =
            currentActivity.campus === "all" ||
            evaluator.campus === "all" ||
            currentActivity.campus === evaluator.campus;
          return (
            condition && !currentActivity.evaluators.includes(evaluator.id)
          );
        })
        .map((evaluator) => ({
          value: evaluator.id,
          text: `${evaluator.rol}: ${evaluator.name} ${evaluator.lastName}`,
        })),
    [evaluators, currentActivity.evaluators, currentActivity.campus]
  );

  useEffect(() => {
    if (evaluators) {
      setCurrentActivity((state) => ({
        ...state,
        evaluators: state.evaluators.filter((evaluator) => {
          const detailedEvaluator = evaluators.find(
            (detailedEvaluator) => detailedEvaluator.id === evaluator
          );
          return (
            currentActivity.campus === "all" ||
            detailedEvaluator.campus === "all" ||
            state.campus === detailedEvaluator.campus
          );
        }),
      }));
    }
  }, [setCurrentActivity, currentActivity.campus, evaluators]);

  const save = async (service) => {
    setLoading(true);
    if (form.validationState) {
      await service(currentActivity);
      window.location.reload();
      handleCancel();
    } else {
      form.setShowError(true);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    save(createActivity);
  };

  const handleEdit = async () => {
    save(editActivity);
  };

  const handleCancel = () => {
    form.setShowError(false);
    closeModal();
  };

  return (
    <section className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeModal} />

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">Crear Actividad</p>
        </header>

        <Form className="modal-card-body" form={form}>
          <Select
            name="type"
            label="Tipo Actividad"
            options={ACTIVITIES_TYPES}
            validations={["required"]}
          />
          {currentActivity.type === "sprint" ? (
            <Select
              name="name"
              label="Sprint"
              options={SPRINTS}
              validations={["required"]}
            />
          ) : (
            <Input
              name="name"
              label="Titulo Actividad"
              type="text"
              placeholder="Creación de informes..."
              validations={["required"]}
            />
          )}

          <Select
            name="campus"
            label="Campus"
            options={CAMPUS.filter(
              (campus) =>
                user.campus === "all" ||
                ["all", user.campus].includes(campus.value)
            )}
            validations={["required"]}
            loading={loadingEvaluators}
          />

          <Input
            name="start"
            label="Fecha de Inicio"
            type="date"
            placeholder="24/12/2012"
            validations={["required"]}
          />

          <Input
            name="end"
            label="Fecha de Término"
            type="date"
            placeholder="24/12/2012"
            validations={["required"]}
            customValidations={[
              (value) => {
                if (
                  currentActivity.start !== "" &&
                  diffDates(currentActivity.start, value) > 0
                ) {
                  return null;
                }
                return "La fecha debe ser posterior o igual al día de inicio";
              },
            ]}
          />

          <Checkbox name="delay" text="¿Acepta atrasos?" />

          {currentActivity.delay && (
            <Input
              name="close"
              label="Fecha de Cierre"
              type="date"
              placeholder="24/12/2012"
              validations={["required"]}
              customValidations={[
                (value) => {
                  if (
                    currentActivity.end &&
                    diffDates(currentActivity.end, value) > 0
                  ) {
                    return null;
                  }
                  return "La fecha debe ser posterior o igual al día de termino";
                },
              ]}
            />
          )}

          <Textarea
            name="description"
            label="Descripción Actividad"
            placeholder="Los alumnos tendrán que crear sus historias de usuario para..."
            validations={["required", "min-8"]}
          />

          <Select
            name="evaluators"
            label="Evaluador(es)"
            options={evaluatorsAsOptions}
            multiple={true}
            disabled={loadingEvaluators}
          />

          <div className="field">
            <div className="control">
              <div className="tags are-medium">
                {currentActivity.evaluators.length ? (
                  currentActivity.evaluators.map((evaluator, index) => (
                    <span className="tag is-rounded is-primary" key={index}>
                      {(() => {
                        const foundEvaluator = evaluators.find(
                          (completeEvaluator) =>
                            completeEvaluator.id === evaluator
                        );
                        return `${foundEvaluator.rol}: ${foundEvaluator.name} ${foundEvaluator.lastName}`;
                      })()}

                      <button
                        className="delete is-small"
                        type="button"
                        onClick={() =>
                          setCurrentActivity((state) => ({
                            ...state,
                            evaluators: state.evaluators.filter(
                              (stateEvaluator) => stateEvaluator !== evaluator
                            ),
                          }))
                        }
                      />
                    </span>
                  ))
                ) : (
                  <span className="tag is-rounded is-light">
                    Sin Evaluadores
                  </span>
                )}
              </div>
            </div>
          </div>
        </Form>

        <footer className="modal-card-foot">
          {currentActivity.id ? (
            <button
              className={`button is-link ${loading && "is-loading"}`}
              onClick={handleEdit}
              disabled={loading}
            >
              Guardar
            </button>
          ) : (
            <button
              className={`button is-success ${loading && "is-loading"}`}
              onClick={handleCreate}
              disabled={loading}
            >
              Crear
            </button>
          )}

          <button
            className={`button is-danger ${loading && "is-loading"}`}
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  );
};

export default ActivityForm;
