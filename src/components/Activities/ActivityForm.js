import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { createActivity, editActivity } from "../../services/activity";
import { ACTIVITIES_TYPES } from "../../utils/constants";
import { diffDates } from "../../utils/functions";
import { Checkbox, Form, Input, Select, Textarea } from "../Forms";

const ActivityForm = ({
  isActive,
  fetchActivities,
  closeModal,
  currentActivity,
  setCurrentActivity,
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm(currentActivity, setCurrentActivity);

  const save = async (service) => {
    setLoading(true);
    if (form.validationState) {
      await service(currentActivity);
      await fetchActivities();
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
          <Input
            name="name"
            label="Titulo Actividad"
            type="text"
            placeholder="Creación de informes..."
            validations={["required"]}
          />

          <Select
            name="type"
            label="Tipo Actividad"
            options={ACTIVITIES_TYPES}
            validations={["required"]}
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
