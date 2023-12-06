import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import useForm from "../../hooks/useForm";
import { createTeam, updateTeam } from "../../services/team";
import { addUser } from "../../store/slices/userSlice";
import { flatMembers } from "../../utils/functions";
import { Form, Input, Textarea } from "../Forms";
import Members from "./Members";

const TeamCard = () => {
  const user = useSelector((state) => state.user);
  const DEFAULT_TEAM = {
    name: "",
    phrase: "",
    linkedin: "",
    members: [user.id],
  };
  const [teamState, setTeamState] = useState(
    !user.team.id ? { ...DEFAULT_TEAM } : flatMembers(user.team)
  );
  const [editState, setEdit] = useState(false);
  const dispatch = useDispatch();
  const form = useForm(teamState, setTeamState);
  const [fetchCreateTeam, loadingTeam] = useFetch(createTeam, (user) =>
    dispatch(addUser(user))
  );
  const [update, loading] = useFetch(updateTeam, (response) => {
    dispatch(addUser(response));
  });

  useEffect(() => {
    if (user.team.id) setTeamState(flatMembers(user.team));
  }, [user.team]);

  const handleCreate = async () => {
    if (form.validationState) {
      await fetchCreateTeam(teamState);
      setEdit(false);
    } else {
      form.setShowError(true);
    }
  };

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
                className={`button ${!user.team.id ? "is-success" : "is-link"}`}
                onClick={() => {
                  setEdit(true);
                }}
                disabled={editState}
              >
                {!user.team.id ? "Crear Equipo" : "Editar Equipo"}
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

              <Textarea
                name="phrase"
                label="Frase"
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
                    className={`button is-success ${
                      (loading || loadingTeam) && "is-loading"
                    }`}
                    onClick={!user.team.id ? handleCreate : handleUpdate}
                    disabled={loading || loadingTeam}
                  >
                    {!user.team.id ? "Crear" : "Actualizar"}
                  </button>
                </div>

                <div className="control">
                  <button
                    type="button"
                    className={`button is-danger ${loading && "is-loading"}`}
                    onClick={handleCancel}
                    disabled={loading || loadingTeam}
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

export default TeamCard;
