import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import { updateTeam } from "../../services/team";
import { addUser } from "../../store/slices/userSlice";
import { flatMembers, setModalState } from "../../utils/functions";
import { Form, Input } from "../Forms";
import Members from "./Members";
import TeamForm from "./TeamForm";

const TeamCard = ({ user }) => {
  const [teamModal, setTeamModal] = useState(false);
  const [teamState, setTeamState] = useState(flatMembers(user.team));
  const [editState, setEdit] = useState(false);
  const dispatch = useDispatch();
  const form = useForm(teamState, setTeamState);
  const [update, loading] = useFetch(updateTeam, (response) => {
    dispatch(addUser(response));
  });

  useEffect(() => {
    setTeamState(flatMembers(user.team));
  }, [user.team]);

  const handleUpdate = async () => {
    try {
      if (form.validationState) {
        await update({
          ...user.team,
          ...teamState,
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
    setTeamState(flatMembers(user.team));
  };

  return (
    <section className="container">
      {!user.team.id || teamModal ? (
        <>
          <div className="has-text-right">
            <button
              className="button is-success is-large"
              onClick={() => {
                setModalState(true, setTeamModal);
              }}
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Crear Equipo</span>
            </button>
          </div>

          <TeamForm
            isActive={teamModal}
            closeModal={() => {
              setModalState(false, setTeamModal);
            }}
            userId={user.id}
          />
        </>
      ) : (
        <div className="columns">
          <div className="column is-3">
            <article className="box has-background-primary">
              <img
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt="team_logo"
              />
            </article>
          </div>
          <div className="column">
            <div className="level">
              <div className="level-left">
                <h1 className="title is-4 level-item">Equipo</h1>
              </div>
              <div className="level-right">
                <button
                  className="button is-link"
                  onClick={() => {
                    setEdit(true);
                  }}
                  disabled={editState}
                >
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
                  placeholder="Ingrese nombre del equipo"
                  validations={["required"]}
                  disabled={!editState}
                />

                <Input
                  name="phrase"
                  label="Frase"
                  type="text"
                  placeholder="No ingresado"
                  disabled={!editState}
                />

                <Input
                  name="linkedin"
                  label="Linkedin"
                  type="text"
                  placeholder="No ingresado"
                  disabled={!editState}
                  icon="fa-brands fa-linkedin"
                />

                <Members
                  team={teamState}
                  userId={user.id}
                  setTeam={setTeamState}
                  editable={editState}
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
      )}
    </section>
  );
};

export default TeamCard;
