import React, { useState } from 'react';
import { ACTIVITIES_TYPES } from '../../utils/constants';
import { diffDates, newActivity } from '../../utils/functions';
import { Checkbox, Input, Select, Textarea } from '../Forms';

const ActivityForm = ({isActive, closeModal}) => {
  const [showErrorState, setShowError] = useState(false);
  const [errorState, setError] = useState(false);
  const [formState, setForm] = useState({
    nombre: null,
    tipo: null,
    inicio: null,
    termino: null,
    atraso: false,
    cierre: null,
    descripcion: null
  });

  const clearForm = () => {
    const newState = Object.keys(formState).reduce((prev, acc) => {
      prev[acc] = acc === 'atraso' ? false : null;
      return prev;
    }, {});
    setForm(newState);
  }

  const handleCreate = () => {
    console.log(formState);
    if (errorState) {
      console.log('hay errores');
      setShowError(true);
    } else {
      // setActivities({...activitiesState, ...newActivity()});
      handleCancel();
    }
  }

  const handleCancel = () => {
    clearForm();
    closeModal();
  }

  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={closeModal}/>

      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            Crear Actividad
          </p>
        </header>

        <form className="modal-card-body">
          <Input
            name="nombre"
            label="Titulo Actividad"  
            type="text"
            placeholder="Creación de informes..."
            validations={['required']}
            state={formState}
            setState={setForm}
            showError = {showErrorState}
            setError = {setError}
          />

          <Select
            name="tipo"
            label="Tipo Actividad"
            options={ACTIVITIES_TYPES}
            validations={['required']}
            state={formState}
            setState={setForm}
            showError = {showErrorState}
            setError = {setError}
          />

          <Input
            name="inicio"
            label="Fecha de Inicio"  
            type="date"
            validations={['required', 'dateFromNow']}
            state={formState}
            setState={setForm}
            showError = {showErrorState}
            setError = {setError}
          />

          <Input
            name="termino"
            label="Fecha de Término"  
            type="date"
            validations={['required']}
            customValidations={[
              (value) => {
                if (formState.inicio && diffDates(formState.inicio, value) > 0) {
                  return 'La fecha debe ser posterior o igual al día de inicio'
                }
                return null;
              }
            ]}
            state={formState}
            setState={setForm}
            showError = {showErrorState}
            setError = {setError}
          />

          <Checkbox
            name="atraso"
            text="¿Acepta atrasos?"
            state={formState}
            setState={setForm}
          />

          {
            formState.atraso &&
            <Input
              name="cierre"
              label="Fecha de Cierre"  
              type="date"
              placeholder="24-12-2012"
              validations={['required']}
              customValidations={[
                (value) => {
                  if (formState.termino && diffDates(formState.termino, value) > 0) {
                    return 'La fecha debe ser posterior o igual al día de termino'
                  }
                  return null;
                }
              ]}
              state={formState}
              setState={setForm}
              showError = {showErrorState}
              setError = {setError}
            />
          }
          
          <Textarea
            name="descripcion"
            label="Descripción Actividad"
            placeholder="Los alumnos tendrán que crear sus historias de usuario para..."
            validations={['required']}
            state={formState}
            setState={setForm}
            showError = {showErrorState}
            setError = {setError}
          />
        </form>

        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleCreate}>
            Crear
          </button>

          <button className="button is-danger" onClick={handleCancel}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default ActivityForm;