import React from 'react';

const TeamInfo = () => {
  return (
    <div className='column'>
      <div className='box'>
        <div className='level'>
          <div className='level-left'>                  
            <div>
              <h1 className='title'>Nombre equipo</h1>
              <h2 className='subtitle'>Frase equipo</h2>
            </div>
          </div>
          <div className='level-right'>
            <div>
              <figure className="image is-128x128">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt='logo_equipo'/>
              </figure>
            </div>
          </div>
        </div>

        <div className="field">   
          <label className="label">Miembros</label>  
          <div className="control">
            <div className="tags">
              {
                [1,2,3,4].map((responsable, index)=>
                  <span className="tag is-light is-medium" key={index}>Gabriel Valenzuela</span>
                ) 
            }
            </div>
          </div>
        </div>

        <button className='button'>
          Editar
        </button>
      </div>
    </div>
  )
}

export default TeamInfo;