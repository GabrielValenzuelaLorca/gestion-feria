import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { updateStories } from '../../store/slices/storySlice';
import { criticidadStyle } from '../../utils/classStyles';
import { CRITICIDAD, RESPONSABLES_SAMPLE } from '../../utils/constants';
import { newStory } from '../../utils/functions';

const StoryDetails = ({story, isActive, closeModal}) => {  
  const modalBodyRef = useRef();
  const dispatch = useDispatch();

  const selectResponsable = (element) => {
    const classList = element.classList;
    classList.toggle('selected');
    classList.toggle('is-link');
  }

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

  const clearForm = () => {
    const formData = modalBodyRef.current.querySelectorAll('.form-value');
    formData.forEach(element => {
      if (element.classList.contains("buttons")){
        [...element.children].forEach(resp => {
          resp.classList = "button";
          if (story.responsables.includes(resp.innerText))
            selectResponsable(resp);
        })
      } else 
        element.value = story[element.name];
    });
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
      } else if (element.classList.contains("validate-number")) {
        const inputClass = element.classList;
        const warningMessageClass = modalBodyRef.current.querySelector(`.warning-${element.name}`).classList;
        if(parseInt(element.value, 10) < parseInt(element.min, 10) || (element.max !== "" && parseInt(element.value, 10) > parseInt(element.max, 10))){
          inputClass.add("is-danger");
          warningMessageClass.remove("is-hidden");
          validation = false;
        } else {
          inputClass.remove("is-danger");
          warningMessageClass.add("is-hidden");
          result[element.name] = element.value;
        }
      } else if (element.classList.contains("buttons")){
        result.responsables = [];
        [...element.children].forEach(resp => {
          if (resp.classList.contains('selected'))
            result.responsables.push(resp.innerText)
        })
      } else 
        result[element.name] = element.value === "" ? null : element.value;
    });

    if(validation){
      result = newStory({...story, ...result});
      dispatch(updateStories([result]));
      toggleForm();
    }
  }

  const handleCancel = () => {
    toggleForm();
    clearForm();
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
          {/* Sección form numero */}
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

          {/* Sección form titulo */}
          <div className="field is-hidden for-hide">
            <label className="label">Título Historia</label>
            <div className="control">
              <input className="input form-value required" name="titulo" type="text" placeholder="Creación de usuarios, CRUD perfiles, etc..." defaultValue={story.titulo}/>
            </div>
            <p className="help is-danger is-hidden warning-titulo">
              Este campo es obligatorio
            </p>
          </div>

          {/* Sección descripción */}
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

          {/* Sección puntos */}
          <div className="field for-hide">
            <label className="label">Puntos de Historia </label>     
            <span className="tag is-medium is-primary">{story.puntos} Puntos</span>    
          </div>

          {/* Sección avance */}
          <div className="field for-hide">
            <label className="label level is-mobile">
              <span className="level-left">Porcentaje de Avance</span>
              <span className="level-right">{story.avance}%</span>
            </label>     
            <progress className="progress is-link" value={story.avance} max="100">{story.avance}</progress>    
          </div>

          {/* Sección form de puntos y avance */}
          <div className="field is-horizontal is-hidden for-hide">
            <div className="field-body">
              <div className="field">
                <label className="label">Puntos de Historia</label>
                <div className="control">
                  <input className="input form-value validate-number" name="puntos" type="number" placeholder="10" min="0" defaultValue={story.puntos}/>
                </div>
                <p className="help is-danger is-hidden warning-puntos">
                  Valor inválido
                </p>
              </div>
              <div className="field">
                <label className="label">Porcentaje de Avance</label>
                <div className="control">
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input className="input form-value validate-number" name="avance" type="number" placeholder="50" min="0" max="100" defaultValue={story.avance}/>
                    </div>
                    <div className="control">
                      <button className="button is-static">%</button>
                    </div>
                  </div>
                </div>
                <p className="help is-danger is-hidden warning-avance">
                  Valor inválido
                </p>
              </div>
            </div>
          </div>

          {/* Sección criterios de aceptación */}
          <div className="field">
            <label className="label">Criterios de Aceptación</label>
            <div className="control">
              <textarea className="textarea for-read form-value" name="criterios" 
              placeholder="El sistema debe ser capaz de..."
              defaultValue={story.criterios || "Sin Criterios de Aceptación"}
              readOnly/>
            </div>
          </div>

          {/* Sección criticidad */}
          <div className="field">
            <label className="label">Criticidad</label>    
            <span className={`tag is-medium is-${criticidadStyle[story.criticidad]} for-hide`}>
              {story.criticidad}
            </span>
            <div className="control is-hidden for-hide">
              <div className="select">
                <select className="form-value" name="criticidad" defaultValue={story.criticidad} onChange={el => changeColorSelect(el.target)}>
                  {CRITICIDAD.map((item,i) => 
                    <option className="has-background-white has-text-black" key={i} value={item}>{item}</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Sección responsables */}
          <div className="field">   
            <label className="label">Responsable(s)</label>  
            <div className="control for-hide">
              <div className="tags">
                {story.responsables.length ? 
                  story.responsables.map((responsable, index)=>
                    <span className="tag is-light is-medium" key={index}>{responsable}</span>
                  ) : 
                  <span className="tag is-light is-medium">Sin Responsables</span>
              }
              </div>
            </div>

            <div className="control is-hidden for-hide">
              <div className="buttons form-value">
                {RESPONSABLES_SAMPLE.map((resp, i) =>
                  <button key={i} className={`button ${story.responsables.includes(resp) ? "selected is-link" : ""}`} onClick={el => selectResponsable(el.target)}>{resp}</button>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="modal-card-foot">
          <button className="button is-link for-hide" onClick={toggleForm}>
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