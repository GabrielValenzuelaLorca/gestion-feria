import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { createTeam } from '../../services/team';
import { getUsers } from '../../services/user';
import { addUser } from '../../store/actions/userActions';
import { Form, Input, Select, } from '../Forms';

const TeamForm = ({isActive, closeModal, userId}) => {
  const DEFAULT_TEAM = {
    name: '',
    phrase: '',
    members: [userId]
  };

  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [fetchStudents, loadingStudents] = useFetch(getUsers, setStudents);
  const [fetchCreateTeam, loadingTeam] = useFetch(createTeam, user => dispatch(addUser(user)));
  const form = useForm(team, setTeam);

  useEffect(() => {
    fetchStudents({"rol": "Alumno"});
  }, [fetchStudents])

  const handleCreate = async () => {
    if (form.validationState) {
      await fetchCreateTeam(team);
      closeModal();
    } else {
      form.setShowError(true);
    }
  };

  const handleCancel = () => {
    form.setShowError(false);
    setTeam(DEFAULT_TEAM);
    closeModal();
  };

  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background"/>

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            Crear Equipo
          </p>
        </header>

        <Form className="modal-card-body" form={form}>
          <Input
            name="name"
            label="Nombre Equipo"  
            type="text"
            placeholder="Ingrese nombre"
            validations={['required']}
          />

          <Input
            name="phrase"
            label="Frase representativa del equipo"  
            type="text"
            placeholder="Ingrese frase"
          />

          <Select
            name="members"
            label="Miembros"
            placeholder='Seleccione a los miembros/as de su equipo'
            options={students
              .filter(student => !student.team.id && !team.members.includes(student.id))
              .map(student => ({text: student.name, value: student.id}))
            }
            validations={['required']}
            multiple={true}
            disabled={loadingStudents}
          />

          <div className="field">   
            <label className="label">Miembros Seleccionados</label>  
            <div className="control">
              <div className="tags">
                {
                  students.length &&
                    team.members.map((id, index) =>
                      <span className="tag is-primary is-medium" key={index}>
                        {students.find(student => student.id === id).name}
                        {
                          id !== userId &&
                            <button className="delete is-small" type='button' onClick={() =>
                              setTeam(team => ({...team, members: team.members.filter(member => member !== id)}))
                            }/>
                        }
                      </span>
                    )
                }
              </div>
            </div>
          </div>
        </Form>
        
        <footer className="modal-card-foot">
          <button className={`button is-success ${loadingTeam && 'is-loading'}`} onClick={handleCreate} disabled={loadingTeam}>
            Crear
          </button>

          <button className={`button is-danger ${loadingTeam && 'is-loading'}`} onClick={handleCancel} disabled={loadingTeam}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default TeamForm;