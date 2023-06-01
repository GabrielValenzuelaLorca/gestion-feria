import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { createTeam } from '../../services/team';
import { addUser } from '../../store/slices/userSlice';
import { Form, Input } from '../Forms';
import Members from './Members';

const TeamForm = ({isActive, closeModal, userId}) => {
  const DEFAULT_TEAM = {
    name: '',
    phrase: '',
    members: [userId]
  };

  const dispatch = useDispatch();
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [fetchCreateTeam, loadingTeam] = useFetch(createTeam, user => dispatch(addUser(user)));
  const form = useForm(team, setTeam);

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

          <Members
            team={team}
            userId={userId}
            setTeam={setTeam}
            editable
          />
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