import { useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import { updateUser } from "../../services/user";
import { addUser } from "../../store/slices/userSlice";
import { Form, Input } from "../Forms";

const UserCard = ({ user: { auth_token, team, ...userData } }) => {
  const [userState, setUserState] = useState(userData);
  const [editState, setEdit] = useState(false);
  const dispatch = useDispatch();
  const form = useForm(userState, setUserState);
  const [update, loading] = useFetch(updateUser);

  const handleUpdate = async () => {
    try {
      if (form.validationState) {
        await update(userState);

        dispatch(
          addUser({
            ...userState,
            auth_token,
            team,
          })
        );
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
    setUserState(userData);
  };

  return (
    <section className="container">
      <div className="columns">
        <div className="column is-3">
          <article className="box has-background-primary">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="user_photo"
            />
          </article>
        </div>
        <div className="column">
          <div className="level">
            <div className="level-left">
              <h1 className="title is-4 level-item">Información de usuario</h1>
            </div>
            <div className="level-right">
              <button
                className="button is-link"
                onClick={() => setEdit(true)}
                disabled={editState}
              >
                Editar Usuario
              </button>
            </div>
          </div>
          <article className="box">
            <Form form={form}>
              <Input
                name="name"
                label="Nombre"
                type="text"
                placeholder="Ingrese su nombre"
                validations={["required"]}
                disabled={!editState}
              />

              <Input
                name="email"
                label="Correo"
                type="text"
                placeholder="Ingrese su correo"
                validations={["required", "email"]}
                disabled={!editState}
              />

              <Input name="rol" label="Rol" type="text" disabled={true} />

              <footer
                className={`border-top field is-grouped ${
                  !editState ? "is-hidden" : ""
                }`}
              >
                <div className="control">
                  <button
                    type="button"
                    className={`button is-link ${loading && "is-loading"}`}
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

export default UserCard;
