import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "../components/Forms";
import TeamForm from "../components/Profile/TeamForm";
import useForm from "../hooks/useForm";
import { setModalState } from "../utils/functions";

const ProfileView = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [teamModal, setTeamModal] = useState(false);
  const form = useForm(user, dispatch);

  return (
    <section className='section'>
      <section className='container'>
        <div className="columns">
          <div className="column is-3">
            <article className="box has-background-primary">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="team_logo"/>
            </article>
          </div>
          <div className="column">
            <div className="level">
              <div className="level-left">
                <h1 className="title is-4 level-item">Información de usuario</h1>
              </div>
              <div className="level-right">
                <button className="button is-link">
                  Editar Datos
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
        {
          user.rol === "Alumno" && (
            !user.team.id || teamModal ?
              <>
                <div className="has-text-right">
                  <button className="button is-success is-large" onClick={() => {setModalState(true, setTeamModal)}}>
                    Crear Equipo
                  </button>
                </div>

                <TeamForm
                  isActive={teamModal}
                  closeModal={() => { setModalState(false, setTeamModal) }}
                  userId={user.id}
                />
              </>
            :
              <div className="columns">
                hay equipo
                {/* <div className="column is-3">
                  <article className="box has-background-primary">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="team_logo"/>
                  </article>
                </div>
                <div className="column">
                  <div className="level">
                    <div className="level-left">
                      <h1 className="title is-4 level-item">Información de usuario</h1>
                    </div>
                    <div className="level-right">
                      <button className="button is-link">
                        Editar Datos
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
                </div> */}
              </div>
          )
        }
      </section>
    </section>
  )
}

export default ProfileView;