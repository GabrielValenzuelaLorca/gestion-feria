import React from 'react';

const ProjectInfo = () => {
  return (
    <div className='column'>
      <div className='box'>
        <div className='level'>
          <div className='level-left'>                  
            <div>
              <h1 className='title'>Nombre proyecto</h1>
              <h2 className='subtitle'>Descripción proyecto</h2>
            </div>
          </div>
          
          <div className='level-right'>
            <div>
              <figure className="image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt='logo_proyecto'/>
              </figure>
            </div>
          </div>
        </div>

        <div className="field">   
          <label className="label">Correo</label>  
          <div className="control">
            <input className='input' value='nombre' readOnly/>
          </div>
        </div>

        <div className="field">   
          <label className="label">Facebook</label>  
          <div className="control">
            <input className='input' value='nombre' readOnly/>
          </div>
        </div>

        <div className="field">   
          <label className="label">Instagram</label>  
          <div className="control">
            <input className='input' value='nombre' readOnly/>
          </div>
        </div>

        <div className="field">   
          <label className="label">Youtube</label>  
          <div className="control">
            <input className='input' value='nombre' readOnly/>
          </div>
        </div>

        <div className="field">   
          <label className="label">Página Web</label>  
          <div className="control">
            <input className='input' value='nombre' readOnly/>
          </div>
        </div>

        <button className='button'>
          Editar
        </button>
      </div>
    </div>
  )
}

export default ProjectInfo;