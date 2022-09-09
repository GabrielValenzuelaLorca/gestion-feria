import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { Form, Input } from "../Forms";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const form = useForm(user, dispatch);

  return (
    <section className='container'>
      <div className="columns">
        <div className="column is-3">
          <article className="box has-background-primary">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="user_photo"/>
          </article>
        </div>
        <div className="column">
          <div className="level">
            <div className="level-left">
              <h1 className="title is-4 level-item">Información de usuario</h1>
            </div>
            <div className="level-right">
              <button className="button is-link">
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
                disabled={true}
              />

              <Input
                name="email"
                label="Email"
                type="text"
                disabled={true}
              />

              <Input
                name="rol"
                label="Rol"
                type="text"
                disabled={true}
              />
            </Form>
          </article>
        </div>
      </div>
    </section>
  )
};

export default UserCard;