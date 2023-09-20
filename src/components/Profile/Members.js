import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Select } from "../Forms";
import { getUsers } from "../../services/user";

const Members = ({ team, userId, setTeam, editable = false, ...rest }) => {
  const [students, setStudents] = useState([]);
  const [fetchStudents, loadingStudents] = useFetch(getUsers, setStudents);

  const selectableStudents = useMemo(
    () =>
      students
        .filter(
          (student) =>
            (!student.team.id || student.team.id === team.id) &&
            !team.members.includes(student.id)
        )
        .map((student) => ({ text: student.name, value: student.id })),
    [students, team.members, team.id]
  );

  useEffect(() => {
    fetchStudents({ rol: "Alumno", active: true });
  }, [fetchStudents]);

  return (
    <>
      {editable && (
        <Select
          name="members"
          label="Miembros"
          placeholder="Seleccione a los miembros/as de su equipo"
          options={selectableStudents}
          multiple={true}
          disabled={loadingStudents}
          {...rest}
        />
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
                team.members.map((id, index) => (
                  <span className="tag is-primary is-medium" key={index}>
                    {students.find((student) => student.id === id)?.name}
                    {editable && id !== userId && (
                      <button
                        className="delete is-small"
                        type="button"
                        onClick={() =>
                          setTeam((team) => ({
                            ...team,
                            members: team.members.filter(
                              (member) => member !== id
                            ),
                          }))
                        }
                      />
                    )}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Members;
