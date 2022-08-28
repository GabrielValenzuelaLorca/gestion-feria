import { useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input } from "../components/Forms";
import TeamForm from "../components/Profile/TeamForm";
import useForm from "../hooks/useForm";
import { setModalState } from "../utils/functions";

const ProfileView = () => {
  const [user, setUser] = useState(useSelector(state => state.user));
  const [team, setTeam] = useState({
    nombre: '',
    frase: '',
    miembros: []
  });
  const [teamModal, setTeamModal] = useState(false);
  const form = useForm(user, setUser);

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
          !team.id ?
            <div className="has-text-right">
              <button className="button is-success is-large" onClick={() => { setModalState(true, setTeamModal) }}>
                Crear Equipo
              </button>
            </div>
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
        }
        <TeamForm
          isActive={teamModal}
          closeModal={() => { setModalState(false, setTeamModal) }}
          team={team} 
          setTeam={setTeam}
        />
      </section>
    </section>
  )
}

export default ProfileView;