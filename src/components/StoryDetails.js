import React, { useRef } from 'react'
import { criticidadStyle } from '../utils/classStyles';
import { CRITICIDAD } from '../utils/constants';

/*
  responsables
*/

const StoryDetails = ({story, isActive, closeModal}) => {  
  const modalBodyRef = useRef();

  const changeColorSelect = (element) => {
    element.classList = "";
    const classList = element.classList;
    classList.add("form-value");
    classList.add(`has-background-${criticidadStyle[element.value]}`);
    if (["Importante", "Deseable"].includes(element.value))
      classList.add("has-text-white");
  }

  const toggleForm = () => {
    const forHideEl = modalBodyRef.current.querySelectorAll('.for-hide');
    const forReadEl = modalBodyRef.current.querySelectorAll('.for-read');
    const select = modalBodyRef.current.querySelector('select');

    forHideEl.forEach(element => 
      element.classList.toggle("is-hidden")
    )

    forReadEl.forEach(element => 
      element.toggleAttribute("readonly")
    )
    changeColorSelect(select);
  }

  const handleEdit = () => {
    toggleForm();
  }

  const handleSave = () => {
    let result = {};
    let validation = true;
    const formData = modalBodyRef.current.querySelectorAll('.form-value');
    
    formData.forEach(element => {
      if(element.classList.contains("required")){
        const inputClass = element.classList;
        const warningMessageClass = modalBodyRef.current.querySelector(`.warning-${element.name}`).classList;
        if(element.value === ""){
          inputClass.add("is-danger");
          warningMessageClass.remove("is-hidden");
          validation = false;
        } else {
          inputClass.remove("is-danger");
          warningMessageClass.add("is-hidden");
          result[element.name] = element.value;
        }
      } else 
        result[element.name] = element.value === "" ? null : element.value;
    });

    if(validation){
      console.log("la data", result);
      toggleForm();
      closeModal();
    }
  }

  const handleCancel = () => {
    toggleForm();
  }

  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={closeModal}></div>
      
      <article ref={modalBodyRef} className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            HU{story.numero} - {story.titulo}
          </p>
        </header>

        <section className="modal-card-body">
          <div className="field is-hidden for-hide">
            <label className="label">Número Historia</label>
            <div className="control">
              <div className="field has-addons">
                <div className="control">
                  <button className="button is-static">HU</button>
                </div>

                <div className="control">
                  <input className="input form-value required" name="numero" type="number" placeholder="10" min="0" defaultValue={story.numero}/>
                </div>
              </div>
            </div>
            <p className="help is-danger is-hidden warning-numero">
              Este campo es obligatorio
            </p>
          </div>

          <div className="field is-hidden for-hide">
            <label className="label">Título Historia</label>
            <div className="control">
              <input className="input form-value required" name="titulo" type="text" placeholder="Creación de usuarios, CRUD perfiles, etc..." defaultValue={story.titulo}/>
            </div>
            <p className="help is-danger is-hidden warning-titulo">
              Este campo es obligatorio
            </p>
          </div>

          <div className="field">
            <label className="label">Descripción Historia</label>
            <div className="control">
              <textarea className="textarea for-read form-value required" name="descripcion" 
              placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."
              defaultValue={ story.descripcion || "Sin Descripción" }
              readOnly/>
            </div>
            <p className="help is-danger is-hidden warning-descripcion">
              Este campo es obligatorio
            </p>
          </div>

          <div className="field for-hide">
            <label className="label">Puntos de Historia </label>     
            <span className="tag is-medium is-primary">{story.puntos} Puntos</span>    
          </div>

          <div className="field for-hide">
            <label className="label level is-mobile">
              <span className="level-left">Porcentaje de Avance</span>

              <span className="level-right icon-text">
                <span>{story.avance}</span>
                <span className="icon">
                  <i className="fas fa-percentage"/>  
                </span>
              </span>
            </label>     
            <progress className="progress is-link" value={story.avance} max="100">{story.avance}</progress>    
          </div>

          <div className="field is-horizontal is-hidden for-hide">
            <div className="field-body">
              <div className="field">
                <label className="label">Puntos de Historia</label>
                <div className="control">
                  <input className="input form-value" name="puntos" type="number" placeholder="10" min="0" defaultValue={story.puntos}/>
                </div>
              </div>
              <div className="field">
                <label className="label">Porcentaje de Avance</label>
                <div className="control has-icons-right">
                  <input className="input" name="avance" type="number" placeholder="50" min="0" max="100" defaultValue={story.avance}/>
                  <span className="icon is-right">
                    <i className="fas fa-percentage"/>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Criterios de Aceptación</label>
            <div className="control">
              <textarea className="textarea for-read form-value" name="criterios" 
              placeholder="El sistema debe ser capaz de..."
              defaultValue={story.criterios || "Sin Criterios de Aceptación"}
              readOnly/>
            </div>
          </div>

          <div className="field">
            <label className="label">Criticidad</label>    
            <span className={`tag is-medium is-${criticidadStyle[story.criticidad]} for-hide`}>
              {story.criticidad}
            </span>
            <div className="control is-hidden for-hide">
              <div className="select">
                <select className="form-value" name="criticidad" onChange={el => changeColorSelect(el.target)}>
                  {CRITICIDAD.map((item,i) => 
                    <option className="has-background-white has-text-black" key={i}>{item}</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="field">   
            <label className="label">Responsable(s)</label>  
            <div className="control for-hide">
              <div className="tags">
                {story.responsables.length ? 
                  story.responsables.map((responsable, index)=>
                    <span className="tag is-primary is-medium" key={index}>{responsable}</span>
                  ) : 
                  <span className="tag is-primary is-medium">Sin Responsables</span>
              }
              </div>
            </div>
          </div>
        </section>

        <footer className="modal-card-foot">
          <button className="button is-link for-hide" onClick={handleEdit}>
            Editar
          </button>

          <button className="button is-link for-hide" onClick={closeModal}>
            Cerrar
          </button>
          
          <button  className="button is-success is-hidden for-hide" onClick={handleSave}>
            Guardar
          </button>

          <button className="button is-danger is-hidden for-hide" type="reset" onClick={handleCancel}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default StoryDetails;