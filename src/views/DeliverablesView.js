import React from 'react';

const DeliverablesView = () => {
  return (
    <section className= "section pb-0">
      <div className='box'>
        <div className='level'>
          <div className='level-left'>
            <div>
              <h1 className='title'>Plan de Proyecto</h1>
              <p>Aquí iría una descripción muy buena</p>
              <p>Fecha de cierre: 20/01/2022</p>
              <p>Tiempo restante: 2 días</p>
            </div>
          </div>
          <div className='level-right'>
            <div>
              <div className='block'>

                <div className="file has-name is-boxed">
                  <label className="file-label">
                    <input className="file-input" type="file" name="resume"/>
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">
                        Seleccionar archivo
                      </span>
                    </span>
                    <span className="file-name">
                      Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                  </label>
                </div>
              </div>
              <div className='block'>
                <button className='button is-success is-pulled-right'>
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='box'>
        <div className='level'>
          <div className='level-left'>
            <div>
              <h1 className='title'>Estimación de costos</h1>
              <p>Aquí iría otra descripción muy buena</p>
              <p>Fecha de cierre: 20/01/2022</p>
              <p>Tiempo restante: 2 días</p>
            </div>
          </div>
          <div className='level-right'>
            <div className='box has-background-success'>
              <span className="icon-text has-text-white">
                <span className="icon">
                  <i className="fas fa-check"></i>
                </span>
                <span>Entregado</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeliverablesView;