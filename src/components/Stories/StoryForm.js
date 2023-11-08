import React, { useState } from "react";
import { useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { Form, Input, Textarea } from "../Forms";
import useFetch from "../../hooks/useFetch";
import { createStory } from "../../services/story";

const StoryForm = ({ isActive, handleClose, refresh }) => {
  const user = useSelector((state) => state.user);
  const defaultStoryState = {
    number: "",
    title: "",
    description: "",
    team_id: user.team.id,
  };
  const [storyState, setStory] = useState(defaultStoryState);
  const form = useForm(storyState, setStory);
  const [doCreate, loadingCreate] = useFetch(createStory);

  const save = async () => {
    if (form.validationState) {
      await doCreate(storyState);
      await refresh();
      handleClose();
      clearForm();
    } else {
      form.setShowError(true);
    }
  };

  const cancel = () => {
    form.setShowError(false);
    handleClose();
    clearForm();
  };

  const clearForm = () => {
    setStory(defaultStoryState);
  };

  return (
    <section className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background" onClick={handleClose} />
      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            Crear Historia de Usuario
          </p>
        </header>
        <section className="modal-card-body">
          <Form form={form}>
            <Input
              name="number"
              label="Número Historia"
              type="number"
              placeholder="10"
              min="0"
              validations={["required"]}
              addons={<button className="button is-static">HU</button>}
              disabled={loadingCreate}
            />
            <Input
              name="title"
              label="Título Historia"
              type="text"
              placeholder="Creación de usuarios, CRUD perfiles, etc..."
              validations={["required"]}
              disabled={loadingCreate}
            />
            <Textarea
              name="description"
              label="Descripción Historia"
              placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."
              validations={["required"]}
              disabled={loadingCreate}
            />
          </Form>
        </section>
        <footer className="modal-card-foot">
          <button
            className={`button is-success ${loadingCreate ? "is-loading" : ""}`}
            onClick={save}
            disabled={loadingCreate}
          >
            Crear
          </button>
          <button
            className={`button is-danger ${loadingCreate ? "is-loading" : ""}`}
            onClick={cancel}
            disabled={loadingCreate}
          >
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  );
};

export default StoryForm;
