import React, { useRef } from 'react'
import { criticidadStyle } from '../utils/classStyles';
import { addToRefs } from '../utils/functions';

const StoryDetails = ({story, isActive, closeModal}) => {  
  const hiddenRef = useRef([]);
  const readRef = useRef([]);

  const toggleForm = () => {
    hiddenRef.current.forEach(element => 
      element.classList.toggle("is-hidden")
    )

    readRef.current.forEach(element => 
      element.toggleAttribute("readonly")
    )
  }

  const handleEdit = () => {
    toggleForm();
  }

  const handleCancel = () => {
    toggleForm();
  }

  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={closeModal}></div>
      
      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            HU{story.numero} - {story.titulo}
          </p>
        </header>

        <section className="modal-card-body">
          {/* Inputs de titulo y numero  */}
          <div ref={el => addToRefs(hiddenRef, el)} className="field is-hidden">
            <label className="label">Número Historia</label>
            <div className="control">
              <div className="field has-addons">
                <div className="control">
                  <button className="button is-static">HU</button>
                </div>

                <div className="control">
                  <input className="input" type="number" placeholder="10" min="0" defaultValue={story.numero}/>
                </div>
              </div>
            </div>
            <p className="help is-danger is-hidden">
              Este campo es obligatorio
            </p>
          </div>

          <div ref={el => addToRefs(hiddenRef, el)} className="field is-hidden">
            <label className="label">Título Historia</label>
            <div className="control">
              <input className="input" type="text" placeholder="Creación de usuarios, CRUD perfiles, etc..." defaultValue={story.titulo}/>
            </div>
            <p className="help is-danger is-hidden">
              Este campo es obligatorio
            </p>
          </div>

          <div className="field">
            <label className="label">Descripción Historia</label>
            <div className="control">
              <textarea ref={el => addToRefs(readRef, el)} 
              className="textarea" name="descripcion" 
              placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."
              defaultValue={ story.descripcion || "Sin Descripción" }
              readOnly/>
            </div>
          </div>

          <div className="field">
            <label className="label">Puntos de Historia </label>     
            <span ref={el => addToRefs(hiddenRef, el)} className="tag is-medium is-primary">{story.puntos} Puntos</span>    
            <div ref={el => addToRefs(hiddenRef, el)} className="control is-hidden">
              <input className="input" name="puntos" type="number" placeholder="10" min="0" defaultValue={story.puntos}/>
            </div>
          </div>

          <div ref={el => addToRefs(hiddenRef, el)} className="field">
            <label className="label level is-mobile">
              <span className="level-left">Porcentaje de Avance</span>
              <span className="level-left">{story.avance}%</span>
            </label>     
            <progress className="progress is-link" value={story.avance} max="100">{story.avance}</progress>    
          </div>

          <div className="field">
            <label className="label">Criterios de Aceptación</label>
            <div className="control">
              <textarea ref={el => addToRefs(readRef, el)}
              className="textarea" name="criterios" 
              placeholder="El sistema debe ser capaz de..."
              defaultValue={story.criterios || "Sin Criterios de Aceptación"}
              readOnly/>
            </div>
          </div>

          <div className="field">
            <label className="label">Criticidad</label>    
            <span ref={el => addToRefs(hiddenRef, el)} className={`tag is-medium is-${criticidadStyle[story.criticidad]}`}>
              {story.criticidad}
            </span>
            <div ref={el => addToRefs(hiddenRef, el)} className="control is-hidden">
              <div className="select">
                <select>
                  <option>Importante</option>
                  <option>Esencial</option>
                  <option>Deseable</option>
                  <option>Opcional</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">   
            <label className="label">Responsable(s)</label>  
            <div ref={el => addToRefs(hiddenRef, el)} className="control">
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
          <button ref={el => addToRefs(hiddenRef, el)} className="button is-link" onClick={handleEdit}>
            Editar
          </button>

          <button ref={el => addToRefs(hiddenRef, el)} className="button is-link" onClick={closeModal}>
            Cerrar
          </button>
          
          <button ref={el => addToRefs(hiddenRef, el)} className="button is-success is-hidden">
            Guardar
          </button>

          <button ref={el => addToRefs(hiddenRef, el)} className="button is-danger is-hidden" type="reset" onClick={handleCancel}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default StoryDetails;