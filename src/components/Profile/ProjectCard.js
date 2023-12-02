import { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { Form, Input, Textarea } from "../Forms";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { addUser } from "../../store/slices/userSlice";
import { updateTeam } from "../../services/team";
import { flatMembers } from "../../utils/functions";

const ProjectCard = () => {
  const user = useSelector((state) => state.user);
  const [projectState, setProjectState] = useState(user.team.project);
  const [editState, setEdit] = useState(false);
  const dispatch = useDispatch();
  const form = useForm(projectState, setProjectState);
  const [update, loading] = useFetch(updateTeam, (response) => {
    dispatch(addUser(response));
  });

  useEffect(() => {
    setProjectState(user.team.project);
  }, [user.team.project]);

  const handleUpdate = async () => {
    try {
      if (form.validationState) {
        await update({
          ...flatMembers(user.team),
          project: projectState,
        });
        setEdit(false);
      } else {
        form.setShowError(true);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCancel = () => {
    form.setShowError(false);
    setEdit(false);
    setProjectState(user.team.project);
  };

  return (
    <section className="container">
      <div className="columns">
        <div className="column is-3">
          <article className="box has-background-primary">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="project_logo"
            />
          </article>
        </div>
        <div className="column">
          <div className="level">
            <div className="level-left">
              <h1 className="title is-4 level-item">Proyecto</h1>
            </div>
            <div className="level-right">
              <button
                className="button is-link"
                onClick={() => setEdit(true)}
                disabled={editState}
              >
                Editar Proyecto
              </button>
            </div>
          </div>
          <article className="box">
            <Form form={form}>
              <Input
                name="name"
                label="Nombre"
                placeholder="No ingresado"
                type="text"
                disabled={!editState}
              />

              <Textarea
                name="description"
                label="Descripción"
                placeholder="No ingresado"
                disabled={!editState}
              />

              <Input
                name="email"
                label="Correo"
                placeholder="No ingresado"
                type="email"
                validations={["email"]}
                disabled={!editState}
                icon="fa-solid fa-envelope"
              />

              <Input
                name="facebook"
                label="Facebook"
                placeholder="No ingresado"
                type="text"
                disabled={!editState}
                icon="fa-brands fa-facebook"
              />

              <Input
                name="instagram"
                label="Instagram"
                placeholder="No ingresado"
                type="text"
                disabled={!editState}
                icon="fa-brands fa-instagram"
              />

              <Input
                name="youtube"
                label="Youtube"
                placeholder="No ingresado"
                type="text"
                disabled={!editState}
                icon="fa-brands fa-youtube"
              />

              <Input
                name="webpage"
                label="Página Web"
                placeholder="No ingresado"
                type="text"
                disabled={!editState}
                icon="fa-solid fa-window-restore"
              />

              <footer
                className={`border-top field is-grouped ${
                  !editState ? "is-hidden" : ""
                }`}
              >
                <div className="control">
                  <button
                    type="button"
                    className={`button is-success ${loading && "is-loading"}`}
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    Actualizar
                  </button>
                </div>

                <div className="control">
                  <button
                    type="button"
                    className={`button is-danger ${loading && "is-loading"}`}
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                </div>
              </footer>
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
