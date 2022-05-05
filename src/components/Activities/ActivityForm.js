import React, { useRef, useState } from 'react';
import { diffDates, newActivity, validate } from '../../utils/functions';
import { Checkbox, Input, Select, Textarea } from '../Forms';

const ActivityForm = ({isActive, closeModal, activitiesState, setActivities}) => {
  const fields = ["nombre", "tipo", "inicio", "termino", "atraso", "cierre", "descripcion"]
  const [validState, setValid] = useState({
    nombre: false,
    tipo: false,
    inicio: false,
    termino: false,
    descripcion: false,
  });
  const [customWarning, setWarning] = useState({
    termino: "",
    cierre: ""
  });
  const [showWarning, setShow] = useState(false);
  const [checkState, setCheck] = useState(false);
  const formRef = useRef();

  const resetValid = () => {
    let valid = {}, warning={};
    Object.keys(validState).forEach(field => {
      valid[field] = false;
    });
    Object.keys(customWarning).forEach(field => {
      warning[field] = "";
    });
    setValid(valid);
    setWarning(warning);
    setShow(false);
  }

  const clearForm = () => {
    const elements = formRef.current.elements;
    fields.forEach(field => {
      if(elements[field]){
        if (field==="atraso"){
          elements[field].checked = false;
          setCheck(false);
        }
        else elements[field].value = "";
      }
    })
    resetValid();
  }

  const handleCheck = (check) => {
    setCheck(check);
    if(check){
      setWarning({...customWarning, cierre:""})
      setValid({...validState, cierre: false});
    }
    else {
      let {cierre, ...state} = validState;
      setValid(state);
    }
  }

  const handleCreate = () => {
    let values = {};
    const elements = formRef.current.elements;
    let customValidate = {
      termino: false,
    }
    if(Object.keys(elements).includes("cierre"))
      customValidate.cierre = false;

    fields.forEach(field => {
      if(elements[field]){
        values[field] = field==="atraso" ? elements[field].checked : elements[field].value;
        // Custom validation
        if(validState.termino && field==="termino" && elements["inicio"].value !== ""){
          let diffValid = diffDates(elements["inicio"].value, elements[field].value) > 0;
          customValidate.termino = diffValid;
          setValid({...validState, termino: diffValid});
          setWarning({...customWarning, termino: `La fecha debe ser posterior o igual al día de inicio`});
        } else if(validState.cierre && field === "cierre" && elements["termino"].value !== ""){
          let diffValid = diffDates(elements["termino"].value, elements[field].value) > 0;
          customValidate.cierre = diffValid;
          setValid({...validState, cierre: diffValid}); 
          setWarning({...customWarning, cierre: `La fecha debe ser posterior o igual al día de termino`});
        }
      }
    });

    if(validate(validState) && validate(customValidate)){
      setActivities({...activitiesState, ...newActivity(values)});
      handleCancel();
    } else 
      setShow(true);
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
          <Input name="nombre"
            label="Titulo Actividad"  
            type="text"
            placeholder="Creación de informes..."
            validations={{required:true}}
            validState={validState}
            show={showWarning}
            setValid={setValid}
          />

          <Select name="tipo"
            label="Tipo Actividad"
            options={[
              "Documento",
              "Presentación",
              "Creación de Historias",
              "Edición de Historias",
              "Repartición de Historias por Sprint",
              "Sprint 1",
              "Sprint 2",
              "Sprint 3",
            ]}
            required={true}
            validState={validState}
            setValid={setValid}
            show={showWarning}
          />

          <Input name="inicio"
            label="Fecha de Inicio"  
            type="date"
            validations={{
              required:true,
              fromNow:true
            }}
            validState={validState}
            show={showWarning}
            setValid={setValid}
          />

          <Input name="termino"
            label="Fecha de Término"  
            type="date"
            validations={{required:true}}
            validState={validState}
            show={showWarning}
            setValid={setValid}
            customWarning={customWarning.termino}
          />

          <Checkbox name="atraso"
            text="¿Acepta atrasos?"
            setCheck={handleCheck}
          />

          {
            checkState &&
            <Input name="cierre"
              label="Fecha de Cierre"  
              type="date"
              placeholder="24-12-2012"
              validations={{required:true}}
              validState={validState}
              show={showWarning}
              setValid={setValid}
              customWarning={customWarning.cierre}
            />
          }
          
          <Textarea name="descripcion"
            label="Descripción Actividad"
            placeholder="Los alumnos tendrán que crear sus historias de usuario para..."
            validation={{
              required: true
            }}
            validState={validState}
            setValid={setValid}
            show={showWarning}
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