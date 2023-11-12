import React, { useState } from "react";
import { useSelector } from "react-redux";
import { criticidadStyle } from "../../utils/classStyles";
import { CRITICIDAD } from "../../utils/constants";
import useForm from "../../hooks/useForm";
import { Form, Input, Select, Textarea } from "../Forms";
import { useMemo } from "react";
import useFetch from "../../hooks/useFetch";
import { updateStory } from "../../services/story";
import { useContext } from "react";
import { refreshContext } from "../../views/StoriesView";

const StoryDetails = ({ story, isActive, closeModal }) => {
  const [editState, setEdit] = useState(false);
  const [storyState, setStory] = useState(story);
  const form = useForm(storyState, setStory);
  const user = useSelector((state) => state.user);
  const [fetchUpdate, loadingUpdate] = useFetch(updateStory);
  const settings = useSelector((state) => state.settings);
  const fetchStories = useContext(refreshContext);

  const teamMembersAsOptions = useMemo(
    () =>
      user.team.members
        .filter((member) => !storyState.responsables.includes(member.id))
        .map((member) => ({
          value: member.id,
          text: member.name,
        })),
    [storyState.responsables, user.team.members]
  );

  const handleSave = async () => {
    if (form.validationState) {
      story.criteria = story.criteria.filter((criteria) => criteria !== "");
      await fetchUpdate(storyState);
      await fetchStories();
      closeModal();
      handleCancel();
    } else {
      form.setShowError(true);
    }
  };

  const changeSprint = async (e) => {
    const value = e.target.value;
    await fetchUpdate({ ...story, sprint: value });
    await fetchStories();
  };

  const handleCriteriaChange = (e, index) => {
    const value = e.target.value;
    setStory((story) => {
      const newStory = { ...story };
      newStory.criteria[index] = value;
      return newStory;
    });
  };

  const handleAddCriteria = () => {
    setStory((story) => {
      const newStory = {
        ...story,
        criteria: [...story.criteria, ""],
      };
      return newStory;
    });
  };

  const handleDeleteCriteria = () => {
    if (storyState.criteria.length > 1) {
      setStory((story) => {
        const criteria = [...story.criteria];
        criteria.pop();

        const newStory = {
          ...story,
          criteria,
        };
        return newStory;
      });
    }
  };

  const clearForm = () => {
    setStory(story);
  };

  const handleCancel = () => {
    clearForm();
    setEdit(false);
  };

  const handleClose = () => {
    closeModal();
    setEdit(false);
  };

  return (
    <section className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={closeModal}></div>

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            HU{story.number} - {story.title}
          </p>
          {user.rol === "Alumno" && !settings.canEdit && (
            <p className="is-size-7 mr-2 has-text-grey-light">
              *La edición aún no ha sido habilitada
            </p>
          )}
          {user.rol === "Alumno" && !editState && (
            <button
              className="button is-link is-rounded is-small mr-2"
              onClick={() => setEdit(true)}
              disabled={!settings.canEdit}
            >
              <span className="icon is-small">
                <i className="fas fa-pen-to-square"></i>
              </span>
              <span>Editar</span>
            </button>
          )}

          <button className="delete is-medium" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label">Sprint</label>
            <div className="control">
              <div className="select">
                <select
                  name="sprint"
                  onChange={changeSprint}
                  value={story.sprint}
                  disabled={loadingUpdate || !settings.canAssign}
                >
                  {["Backlog", "MVP", "Sprint 1", "Sprint 2", "Sprint 3"].map(
                    (option, i) => (
                      <option value={option} key={i}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            {user.rol === "Alumno" && !settings.canAssign && (
              <p className="is-size-7 has-text-grey-light">
                *La asignación de sprint aún no ha sido habilitada
              </p>
            )}
          </div>
          {!editState ? (
            <>
              <div className="field">
                <label className="label">Descripción</label>
                <div className="control">
                  <p className={story.description ? "" : "is-italic"}>
                    {story.description || "Sin Descripción"}
                  </p>
                </div>
              </div>
              <div className="field">
                <label className="label">Puntos de Historia</label>
                <span className="tag is-medium is-primary is-rounded">
                  {story.points} Puntos
                </span>
              </div>
              <div className="field">
                <label className="label level is-mobile">
                  <span className="level-left">Porcentaje de Avance</span>
                  <span className="level-right">{story.progress}%</span>
                </label>
                <progress
                  className="progress is-primary"
                  value={story.progress}
                  max="100"
                >
                  {story.progress}
                </progress>
              </div>
              <div className="field">
                <label className="label">Criterios de Aceptación</label>
                <div className="control">
                  <div className="content is-small">
                    {story.criteria.length === 1 && story.criteria[0] === "" ? (
                      <p className="is-italic">Sin Criterios de Aceptación</p>
                    ) : (
                      <ol>
                        {story.criteria.map((criteria, i) => (
                          <li key={i}>{criteria}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Criticidad</label>
                <span
                  className={`tag is-rounded is-medium is-${
                    criticidadStyle[story.criticality]
                  }`}
                >
                  {story.criticality}
                </span>
              </div>
            </>
          ) : (
            <Form form={form}>
              <Input
                name="number"
                label="Número Historia"
                type="number"
                placeholder="10"
                min="0"
                validations={["required"]}
                addons={<button className="button is-static">HU</button>}
                disabled={loadingUpdate}
              />
              <Input
                name="title"
                label="Título Historia"
                type="text"
                placeholder="Creación de usuarios, CRUD perfiles, etc..."
                validations={["required"]}
                disabled={loadingUpdate}
              />
              <Textarea
                name="description"
                label="Descripción Historia"
                placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."
                validations={["required"]}
                disabled={loadingUpdate}
              />
              <Input
                name="points"
                label="Puntos de Historia"
                style={{ width: "50%" }}
                type="number"
                placeholder="10"
                min="0"
                validations={["required", "minNumber-0"]}
                disabled={loadingUpdate}
              />
              <Input
                name="progress"
                label="Porcentaje de Avance"
                style={{ width: "50%" }}
                type="number"
                placeholder="50"
                min="0"
                max="100"
                validations={["required", "minNumber-0", "maxNumber-100"]}
                rightAddons={<button className="button is-static">%</button>}
                disabled={loadingUpdate}
              />
              {storyState.criteria.map((criteria, i) => (
                <div className="field" key={i}>
                  {i === 0 && (
                    <label className="label">Criterios de Aceptación</label>
                  )}
                  <div className="control">
                    <textarea
                      className="textarea"
                      value={criteria}
                      name={`criteria-${i}`}
                      placeholder="El sistema debe ser capaz de..."
                      disabled={loadingUpdate}
                      onChange={(e) => handleCriteriaChange(e, i)}
                    />
                  </div>
                </div>
              ))}
              <div className="field">
                <div className="control buttons is-flex is-justify-content-flex-end">
                  <button
                    className="button is-primary is-small"
                    type="button"
                    onClick={handleAddCriteria}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus"></i>
                    </span>
                    <span>Añadir criterio</span>
                  </button>
                  <button
                    className="button is-danger is-small"
                    type="button"
                    onClick={handleDeleteCriteria}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-trash"></i>
                    </span>
                    <span>Remover criterio</span>
                  </button>
                </div>
              </div>
              <Select
                name="criticality"
                label={
                  <span>
                    <span>Criticidad</span>
                    <span
                      className={`icon has-text-${
                        criticidadStyle[storyState.criticality]
                      }`}
                    >
                      <i className="fas fa-circle"></i>
                    </span>
                  </span>
                }
                options={CRITICIDAD}
                disabled={loadingUpdate}
              />
              <Select
                name="responsables"
                label="Responsable(s)"
                options={teamMembersAsOptions}
                multiple={true}
                disabled={loadingUpdate}
              />
            </Form>
          )}
          <div className="field">
            <label className="label">{editState ? "" : "Responsable(s)"}</label>
            <div className="control">
              <div className="tags are-medium">
                {(editState ? storyState.responsables : story.responsables)
                  .length ? (
                  (editState
                    ? storyState.responsables
                    : story.responsables
                  ).map((responsable, index) => (
                    <span className="tag is-rounded is-primary" key={index}>
                      {
                        user.team.members.find(
                          (member) => member.id === responsable
                        ).name
                      }
                      {editState && (
                        <button
                          className="delete is-small"
                          type="button"
                          onClick={() =>
                            setStory((state) => ({
                              ...state,
                              responsables: state.responsables.filter(
                                (member) => member !== responsable
                              ),
                            }))
                          }
                        />
                      )}
                    </span>
                  ))
                ) : (
                  <span className="tag is-rounded is-light">
                    Sin Responsables
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {editState && (
          <footer className="modal-card-foot">
            <button
              className={`button is-success ${
                loadingUpdate ? "is-loading" : ""
              }`}
              onClick={handleSave}
              disabled={loadingUpdate}
            >
              Guardar
            </button>

            <button
              className={`button is-danger ${
                loadingUpdate ? "is-loading" : ""
              }`}
              onClick={handleCancel}
              disabled={loadingUpdate}
            >
              Cancelar
            </button>
          </footer>
        )}
      </article>
    </section>
  );
};

export default StoryDetails;
