import useForm from "../../hooks/useForm";
import { Form, Input } from "../Forms";

const ProjectCard = ({ user }) => {
  const form = useForm(user.team, ()=>{});

  return (
    <section className='container'>
      <div className="columns">
        <div className="column is-3">
          <article className="box has-background-primary">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="project_logo"/>
          </article>
        </div>
        <div className="column">
          <div className="level">
            <div className="level-left">
              <h1 className="title is-4 level-item">Proyecto</h1>
            </div>
            <div className="level-right">
              <button className="button is-link">
                Editar Proyecto
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
                label="Correo"
                type="text"
                disabled={true}
              />

              <Input
                name="facebook"
                label="Facebook"
                type="text"
                disabled={true}
              />

              <Input
                name="instagram"
                label="Instagram"
                type="text"
                disabled={true}
              />

              <Input
                name="youtube"
                label="Youtube"
                type="text"
                disabled={true}
              />

              <Input
                name="webpage"
                label="Página Web"
                type="text"
                disabled={true}
              />
            </Form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;