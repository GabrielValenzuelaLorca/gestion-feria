import React, { useRef, useState } from 'react';
import { newActivity } from '../../utils/functions';
import Checkbox from '../Forms/Checkbox';
import Input from '../Forms/Input';
import Textarea from '../Forms/Textarea';

const ActivityForm = ({isActive, closeModal, activitiesState, setActivities}) => {
  const fields = ["nombre", "inicio", "termino", "atraso", "cierre", "descripcion"]
  const [validState, setValid] = useState({
    nombre: true,
    inicio: true,
    termino: true,
    cierre: true,
    descripcion: true,
  });
  const [checkState, setCheck] = useState(false)
  const formRef = useRef();

  const clearForm = () => {
    const elements = formRef.current.elements;
    fields.forEach(field => {
      if(elements[field]){
        if (field==="atraso") {
          elements[field].checked = false;
          setCheck(false);
        }
        else elements[field].value = "";
      }
    })
  }

  //Chequear que las fechas sean validas
  const handleCreate = () => {
    let values = {};
    const elements = formRef.current.elements;
    let auxValid = {};
    let validation = true;
    fields.forEach(field => {
      if(elements[field]){
        values[field] = field==="atraso" ? elements[field].checked : elements[field].value;
        if(Object.keys(validState).includes(field)){
          let valid = elements[field].value !== "";
          auxValid[field] = valid;
          validation = validation && valid;
        }
      }
    });
    setValid({...validState, ...auxValid});

    if(validation){
      const new_id = Math.max(...Object.keys(activitiesState).map(id => parseInt(id, 10))) + 1;
      const obj = {
        id: new_id,
        ...values
      }
      setActivities({...activitiesState, ...newActivity(obj)});
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

        <form className="modal-card-body" ref={formRef}>
          <Input name={"nombre"}
            label={"Titulo Actividad"}  
            type={"text"}
            placeholder={"Creación de informes..."}
            required={true}
            valid={validState.nombre}
          />

          <Input name={"inicio"}
            label={"Fecha de Inicio"}  
            type={"date"}
            required={true}
            valid={validState.inicio}
          />

          <Input name={"termino"}
            label={"Fecha de Término"}  
            type={"date"}
            required={true}
            valid={validState.termino}
          />

          <Checkbox name={"atraso"}
            text={"¿Acepta atrasos?"}
            setCheck={setCheck}
          />

          {
            checkState &&
            <Input name={"cierre"}
              label={"Fecha de Cierre"}  
              type={"date"}
              placeholder={"24-12-2012"}
              required={true}
              valid={validState.cierre}
            />
          }
          

          <Textarea name={"descripcion"}
            label={"Descripción Actividad"}
            placeholder={"Los alumnos tendrán que crear sus historias de usuario para..."}
            required={true}
            valid={validState.descripcion}
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