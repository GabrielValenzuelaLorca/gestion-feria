import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getUsers } from "../../services/user";
import { useSelector } from "react-redux";
import "../../sass/members.sass";

const Members = ({ team, setTeam, editable = false }) => {
  const user = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const [fetchStudents, loadingStudents] = useFetch(getUsers, setStudents);
  const [activeState, setActive] = useState(false);
  const [searchState, setSearch] = useState("");

  const selectableStudents = useMemo(() => {
    const loweredSearch = searchState.toLowerCase();
    return students.filter(
      (student) =>
        (!student.team.id || student.team.id === team.id) &&
        !team.members.includes(student.id) &&
        student.campus === user.campus &&
        (student.name.toLowerCase().includes(loweredSearch) ||
          student.lastName.toLowerCase().includes(loweredSearch))
    );
  }, [students, team.members, user.campus, team.id, searchState]);

  useEffect(() => {
    fetchStudents({ roles: ["Alumno"], active: true });
  }, [fetchStudents]);

  const deleteTeamMember = (id) => {
    setTeam((team) => ({
      ...team,
      members: team.members.filter((member) => member !== id),
    }));
  };

  const addTeamMember = (id) => {
    setSearch("");
    setTeam((team) => ({
      ...team,
      members: [...team.members, id],
    }));
  };

  const searchMembers = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <>
      {editable && (
        <div
          className={`dropdown field ${activeState ? "is-active" : ""}`}
          style={{ width: "100%" }}
        >
          <div
            className="dropdown-trigger"
            style={{ width: "40%" }}
            onClick={() => setActive(true)}
            onBlur={() => setActive(false)}
          >
            <div className="field">
              <label className="label">Miembros</label>
              <div className="control has-icons-right">
                <input
                  className="input"
                  placeholder="Seleccione a los miembros de su equipo"
                  value={searchState}
                  onChange={searchMembers}
                />
                <span className="icon is-small is-right">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="dropdown-menu" style={{ width: "40%" }}>
            <div className="dropdown-content">
              {selectableStudents.length > 0 ? (
                selectableStudents.map((student, i) => (
                  <button
                    className="dropdown-item button-option"
                    onMouseDown={() => addTeamMember(student.id)}
                    key={i}
                  >
                    {`${student.name} ${student.lastName}`}
                  </button>
                ))
              ) : (
                <p className="dropdown-item">Sin Opciones</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="field">
        <label className="label">
          {editable ? "Miembros Seleccionados" : "Miembros"}
        </label>
        <div className="control">
          {loadingStudents ? (
            <progress className="progress is-primary" />
          ) : (
            <div className="tags">
              {students.length > 0 &&
                team.members.map((id, index) => {
                  const student = students.find((student) => student.id === id);
                  if (student)
                    return (
                      <span className="tag is-primary is-medium" key={index}>
                        {`${student.name} ${student.lastName}`}
                        {editable && id !== user.id && (
                          <button
                            className="delete is-small"
                            type="button"
                            onClick={() => deleteTeamMember(id)}
                          />
                        )}
                      </span>
                    );

                  return (
                    <span className="tag is-primary is-medium" key={index}>
                      Usuario no encontrado
                    </span>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Members;
