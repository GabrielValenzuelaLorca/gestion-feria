import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStories } from "../../store/slices/storySlice";
import { criticidadStyle } from "../../utils/classStyles";
import { CRITICIDAD, RESPONSABLES_SAMPLE } from "../../utils/constants";
import { newStory } from "../../utils/functions";
import useForm from "../../hooks/useForm";
import { Form, Input, Select, Textarea } from "../Forms";
import { useMemo } from "react";

const StoryDetails = ({ story, isActive, closeModal }) => {
  const modalBodyRef = useRef();
  const dispatch = useDispatch();
  const [editState, setEdit] = useState(false);
  const [storyState, setStory] = useState(story);
  const form = useForm(storyState, setStory);
  const user = useSelector((state) => state.user);

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

  const handleSave = () => {
    let result = {};
    let validation = true;
    const formData = modalBodyRef.current.querySelectorAll(".form-value");

    formData.forEach((element) => {
      if (element.classList.contains("required")) {
        const inputClass = element.classList;
        const warningMessageClass = modalBodyRef.current.querySelector(
          `.warning-${element.name}`
        ).classList;
        if (element.value === "") {
          inputClass.add("is-danger");
          warningMessageClass.remove("is-hidden");
          validation = false;
        } else {
          inputClass.remove("is-danger");
          warningMessageClass.add("is-hidden");
          result[element.name] = element.value;
        }
      } else if (element.classList.contains("validate-number")) {
        const inputClass = element.classList;
        const warningMessageClass = modalBodyRef.current.querySelector(
          `.warning-${element.name}`
        ).classList;
        if (
          parseInt(element.value, 10) < parseInt(element.min, 10) ||
          (element.max !== "" &&
            parseInt(element.value, 10) > parseInt(element.max, 10))
        ) {
          inputClass.add("is-danger");
          warningMessageClass.remove("is-hidden");
          validation = false;
        } else {
          inputClass.remove("is-danger");
          warningMessageClass.add("is-hidden");
          result[element.name] = element.value;
        }
      } else if (element.classList.contains("buttons")) {
        result.responsables = [];
        [...element.children].forEach((resp) => {
          if (resp.classList.contains("selected"))
            result.responsables.push(resp.innerText);
        });
      } else result[element.name] = element.value === "" ? null : element.value;
    });

    if (validation) {
      result = newStory({ ...story, ...result });
      dispatch(updateStories([result]));
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

      <article ref={modalBodyRef} className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            HU{story.number} - {story.title}
          </p>

          {!editState && (
            <button
              className="button is-link is-rounded is-small mr-2"
              onClick={() => setEdit(true)}
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
                  <p className={story.criteria ? "" : "is-italic"}>
                    {story.criteria || "Sin Criterios de Aceptación"}
                  </p>
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
              />
              <Input
                name="title"
                label="Título Historia"
                type="text"
                placeholder="Creación de usuarios, CRUD perfiles, etc..."
                validations={["required"]}
              />
              <Textarea
                name="description"
                label="Descripción Historia"
                placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."
                validations={["required"]}
              />
              <Input
                name="points"
                label="Puntos de Historia"
                style={{ width: "50%" }}
                type="number"
                placeholder="10"
                min="0"
                validations={["required"]}
              />
              <Input
                name="progress"
                label="Porcentaje de Avance"
                style={{ width: "50%" }}
                type="number"
                placeholder="50"
                min="0"
                max="100"
                validations={["required"]}
                rightAddons={<button className="button is-static">%</button>}
              />
              <Textarea
                name="criteria"
                label="Criterios de Aceptación"
                placeholder="El sistema debe ser capaz de..."
              />
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
              />
              <Select
                name="responsables"
                label="Responsable(s)"
                options={teamMembersAsOptions}
                multiple={true}
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
            <button className="button is-success" onClick={handleSave}>
              Guardar
            </button>

            <button className="button is-danger" onClick={handleCancel}>
              Cancelar
            </button>
          </footer>
        )}
      </article>
    </section>
  );
};

export default StoryDetails;
