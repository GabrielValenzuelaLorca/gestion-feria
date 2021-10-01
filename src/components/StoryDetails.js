import React, { useRef } from 'react'
import { criticidadStyle } from '../utils/classStyles';

const StoryDetails = ({story, isActive, closeModal}) => {  
  const form = useRef();
  const footer = useRef();
  const field = useRef();

  const toggleForm = () => {
    const footerButtons = Array.from(footer.current.children);
    const formChildren = Array.from(form.current.children);

    footerButtons.forEach(node => {
      node.classList.toggle("is-hidden");
    })
  }

  const handleEdit = () => {
    toggleForm();
  }

  const handleCancel = () => {
    toggleForm();
  }

  return (
    <section className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={closeModal}/>
      
      <article className="modal-card">
        <header className="modal-card-head">
          <p className="has-text-weight-bold is-size-4">
            HU{story.numero} - {story.titulo}
          </p>
        </header>

        <form className="modal-card-body" ref={form}>
          {/* Inputs de titulo y numero  */}
          <div className="field is-grouped is-hidden">
            <div className="control">
              <div className="field has-addons">
                <div className="control">
                  <button className="button is-static">HU</button>
                </div>

                <div className="control">
                  <input className="input" name="numero" type="number" placeholder="10" min="0" defaultValue={story.numero}/>
                </div>
              </div>
            </div>

            <div className="control">
              <input className="input" name="titulo" type="text" placeholder="Creación de usuarios, CRUD perfiles, etc..." defaultValue={story.titulo}/>
            </div>
          </div>

          <div className="field">
            <label className="label">Descripción Historia</label>
            <div className="control">
              <textarea className="textarea" name="descripcion" 
              placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."
              defaultValue={ story.descripcion || "Sin Descripción" }
              readOnly/>
            </div>
          </div>

          <div className="field">
            <label className="label">Puntos de Historia </label>     
            <span className="tag is-medium is-primary">{story.puntos} Puntos</span>    
            <div className="control is-hidden">
              <input className="input" name="puntos" type="number" placeholder="10" min="0" value={story.puntos} readOnly/>
            </div>
          </div>

          <div className="field">
            <label className="label level is-mobile">
              <span className="level-left">Porcentaje de Avance</span>
              <span className="level-left">{story.avance}%</span>
            </label>     
            <progress className="progress is-link" value={story.avance} max="100">{story.avance}</progress>    
          </div>

          <div className="field">
            <label className="label">Criterios de Aceptación</label>
            <div className="control">
              <textarea className="textarea" name="criterios" 
              placeholder="El sistema debe ser capaz de..."
              defaultValue={story.criterios || "Sin Criterios de Aceptación"}
              readOnly/>
            </div>
          </div>

          <div className="field">
            <label className="label">Criticidad</label>    
            <span className= {`tag is-medium is-${criticidadStyle[story.criticidad]}`}>
              {story.criticidad}
            </span>
            <div className="control is-hidden">
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
            <div className="control">
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
        </form>

        <footer className="modal-card-foot" ref={footer}>
          <button className="button is-link" onClick={handleEdit}>
            Editar
          </button>

          <button className="button is-link" onClick={closeModal}>
            Cerrar
          </button>
          
          <button className="button is-success is-hidden">
            Guardar
          </button>

          <button className="button is-danger is-hidden" type="reset" onClick={handleCancel}>
            Cancelar
          </button>
        </footer>
      </article>
    </section>
  )
}

export default StoryDetails;