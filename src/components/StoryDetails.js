import React from 'react'

const StoryDetails = ({story, isActive, handleClose}) => {  

  return (
    <div className={`modal ${ isActive ? "is-active" : "" }`}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-weight-bold	">
            HU{story.numero} - {story.titulo}
          </p>
        </header>
        <section className="modal-card-body">
          <form id="story-details-form">
            <div className="field">
              <label className="label">Descripción Historia</label>
              <div className="control">
                <textarea className="textarea" name="descripcion" 
                placeholder="Como <sujeto> quiero <deseo> para <objetivo>..."
                value={story.descripcion || "Sin Descripción" }
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
              <label className="label">Porcentaje de Avance</label>     
              <progress className="progress is-link" value={story.avance} max="100">{story.avance}</progress>    
            </div>
            <div className="field">
              <label className="label">Criterios de Aceptación</label>
              <div className="control">
                <textarea className="textarea" name="criterios" 
                placeholder="El sistema debe ser capaz de..."
                value={story.criterios || "Sin Criterios de Aceptación"}
                readOnly/>
              </div>
            </div>
            <div className="field">
              <label className="label">Criticidad</label>         
              <span className= {`tag is-medium is-${
                {Alto: "danger",
                Medio: "warning",
                Bajo: "success"}[story.criticidad]}`
              }>{story.criticidad}</span>
              <div className="control is-hidden">
                <div className="select">
                  <select>
                    <option>Alto</option>
                    <option>Medio</option>
                    <option>Bajo</option>
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
        </section>
        <footer className="modal-card-foot">
          <button className="button is-link">Editar</button>
          <button className="button is-link" onClick={handleClose}>Cerrar</button>
        </footer>
      </div>
    </div>
  )
}

export default StoryDetails;