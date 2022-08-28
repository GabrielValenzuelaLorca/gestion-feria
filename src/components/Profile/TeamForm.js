import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import { Form, Input, Select, } from '../Forms';

const TeamForm = ({isActive, closeModal, team, setTeam}) => {
  console.log('team', team);
  const [loading, setLoading] = useState(false);
  
  const form = useForm(team, setTeam);

  const handleCreate = () => {
    console.log('creando');
  };

  const handleCancel = () => {
    form.setShowError(false);
    closeModal();
  };

  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={closeModal}/>

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            Crear Equipo
          </p>
        </header>

        <Form className="modal-card-body" form={form}>
          <Input
            name="nombre"
            label="Nombre Equipo"  
            type="text"
            placeholder="Ingrese nombre"
            validations={['required']}
          />

          <Input
            name="frase"
            label="Frase representativa del equipo"  
            type="text"
            placeholder="Ingrese frase"
          />

          <Select
            name="miembros"
            label="Miembros"
            placeholder='Seleccione a los miembros/as de su equipo'
            options={[1,2,3]}
            validations={['required']}
            multiple={true}
          />
        </Form>
        
        <footer className="modal-card-foot">
          {
            team.id ? 
              <button className={`button is-info ${loading && 'is-loading'}`} disabled={loading}>
                Editar
              </button>
            :
              <button className={`button is-success ${loading && 'is-loading'}`} onClick={handleCreate} disabled={loading}>
                Crear
              </button>
          }

          <button className={`button is-danger ${loading && 'is-loading'}`} onClick={handleCancel} disabled={loading}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default TeamForm;