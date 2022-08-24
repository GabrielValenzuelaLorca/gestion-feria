import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import { createActivity, editActivity } from '../../services/activity';
import { ACTIVITIES_TYPES } from '../../utils/constants';
import { diffDates } from '../../utils/functions';
import { Checkbox, Form, Input, Select, Textarea } from '../Forms';

const ActivityForm = ({isActive, fetchActivities, closeModal, currentActivity, setCurrentActivity}) => {
  const [loading, setLoading] = useState(false);
  
  const form = useForm(currentActivity, setCurrentActivity);

  const save = async (service) => {
    setLoading(true);
    if (form.validationState) {
      await service(currentActivity);
      await fetchActivities();
      handleCancel();
    } else {
      form.setShowError(true);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    save(createActivity);
  };

  const handleEdit = async () => {
    save(editActivity);
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
            // disabled={currentActivity.id}
          />

          <Select
            name="tipo"
            label="Tipo Actividad"
            options={ACTIVITIES_TYPES}
            validations={['required']}
            // disabled={currentActivity.id}
          />

          <Input
            name="inicio"
            label="Fecha de Inicio"  
            type="date"
            validations={['required']}
            // disabled={currentActivity.id}
          />

          <Input
            name="termino"
            label="Fecha de Término"  
            type="date"
            validations={['required']}
            customValidations={[
              (value) => {
                if (currentActivity.inicio !== '' && diffDates(currentActivity.inicio, value) > 0) {
                  return null;
                }
                return 'La fecha debe ser posterior o igual al día de inicio'
              }
            ]}
            // disabled={currentActivity.id}
          />

          <Checkbox
            name="atraso"
            text="¿Acepta atrasos?"
            // disabled={currentActivity.id}
          />

          {
            currentActivity.atraso &&
            <Input
              name="cierre"
              label="Fecha de Cierre"  
              type="date"
              placeholder="24-12-2012"
              validations={['required']}
              customValidations={[
                (value) => {
                  if (currentActivity.termino && diffDates(currentActivity.termino, value) > 0) {
                    return null;
                  }
                  return 'La fecha debe ser posterior o igual al día de termino'
                }
              ]}
              // disabled={currentActivity.id}
            />
          }
          
          <Textarea
            name="descripcion"
            label="Descripción Actividad"
            placeholder="Los alumnos tendrán que crear sus historias de usuario para..."
            validations={['required', 'min-8']}
            // disabled={currentActivity.id}
          />
        </Form>
        
        <footer className="modal-card-foot">
          {
            currentActivity.id ? 
              <button className={`button is-info ${loading && 'is-loading'}`} onClick={handleEdit} disabled={loading}>
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

export default ActivityForm;