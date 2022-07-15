import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import { ACTIVITIES_TYPES } from '../../utils/constants';
import { diffDates, newActivity } from '../../utils/functions';
import { Checkbox, Form, Input, Select, Textarea } from '../Forms';

const ActivityForm = ({isActive, closeModal}) => {
  const [formState, setForm] = useState({
    nombre: '',
    tipo: '',
    inicio: '',
    termino: '',
    atraso: false,
    cierre: '',
    descripcion: ''
  });
  const form = useForm(formState, setForm);

  const clearForm = () => {
    const newState = Object.keys(formState).reduce((prev, acc) => {
      prev[acc] = acc === 'atraso' ? false : '';
      return prev;
    }, {});
    setForm(newState);
  }

  const handleCreate = () => {
    if (form.validationState) {
      // setActivities({...activitiesState, ...newActivity()});
      handleCancel();
    } else {
      form.setShowError(true);
    }
  }

  const handleCancel = () => {
    form.setShowError(false);
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

        <Form className="modal-card-body" form={form}>
          <Input
            name="nombre"
            label="Titulo Actividad"  
            type="text"
            placeholder="Creación de informes..."
            validations={['required']}
          />

          <Select
            name="tipo"
            label="Tipo Actividad"
            options={ACTIVITIES_TYPES}
            validations={['required']}
          />

          <Input
            name="inicio"
            label="Fecha de Inicio"  
            type="date"
            validations={['required', 'dateFromNow']}
          />

          <Input
            name="termino"
            label="Fecha de Término"  
            type="date"
            validations={['required']}
            customValidations={[
              (value) => {
                if (formState.inicio !== '' && diffDates(formState.inicio, value) > 0) {
                  return null;
                }
                return 'La fecha debe ser posterior o igual al día de inicio'
              }
            ]}
          />

          <Checkbox
            name="atraso"
            text="¿Acepta atrasos?"
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
                    return null;
                  }
                  return 'La fecha debe ser posterior o igual al día de termino'
                }
              ]}
            />
          }
          
          <Textarea
            name="descripcion"
            label="Descripción Actividad"
            placeholder="Los alumnos tendrán que crear sus historias de usuario para..."
            validations={['required', 'min-8']}
          />
        </Form>

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