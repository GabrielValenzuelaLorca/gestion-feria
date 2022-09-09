import { useState } from "react";
import useForm from "../../hooks/useForm";
import { setModalState } from "../../utils/functions";
import { Form, Input } from "../Forms";
import TeamForm from "./TeamForm";

const TeamCard = ({ user }) => {
  const [teamModal, setTeamModal] = useState(false);
  const form = useForm(user.team, ()=>{});

  return (
    <section className='container'>
      {
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
            <div className="column is-3">
              <article className="box has-background-primary">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="team_logo"/>
              </article>
            </div>
            <div className="column">
              <div className="level">
                <div className="level-left">
                  <h1 className="title is-4 level-item">Equipo</h1>
                </div>
                <div className="level-right">
                  <button className="button is-link">
                    Editar Equipo
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
                    name="phrase"
                    label="Frase"
                    type="text"
                    disabled={true}
                  />
                </Form>
              </article>
            </div>
          </div>
      }
    </section>
  )
};

export default TeamCard;