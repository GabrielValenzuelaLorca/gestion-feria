import React, { useState } from 'react';

const RubricView = () => {
  const [columns, setColumns] = useState([0])

  const addRow = () => {
    setColumns(state => 
      [
        ...state, 
        0
      ]
    )
  };

  const addColumn = (row) => {
    const newState = [...columns];
    newState[row] += 1;
    setColumns(newState);
  };

  const deleteRow = (row) => {
    const newState = [...columns];
    if(newState[row] > 0) newState[row] -= 1;
    else newState.splice(row, 1);
    setColumns(newState);
  };

  return (
    <section className='section'>
      <header className='box has-background-info'>
        <h1 className='title is-4 has-text-white'>Plan de proyecto</h1>
        <h2 className='subtitle is-6 has-text-white'>Descripción de actividad</h2>
        <p className='has-text-white'>Fecha de Inicio</p>
        <p className='has-text-white'>Fecha de Término</p>
      </header>
      <form>
        {
          columns.map((row, i) => 
            <div className='columns is-variable is-1' key={i}>
              <div className='column'>
                <div className='box'>
                  <div className="field">
                    <label className='label'>Criterio {i+1}:</label>
                    <div className="control">
                      <textarea className="textarea is-small" placeholder='Ingrese descripción'/>
                    </div>
                  </div>
                </div>
              </div>  

              {
                [...Array(row).keys()].map(column => 
                  <div className='column' key={`${i}-column-${column}`}>
                    <div className='box'>
                      <div className="field">
                        <label className='label'>Puntaje {column+1}:</label>
                        <div className="control">
                          <textarea className="textarea is-small" placeholder='Ingrese descripción'/>
                        </div>
                      </div>

                      <div className="field">
                        <label className='label'>Puntuación:</label>
                        <div className="control">
                          <input className="input is-small is-rounded" type='number' min='0' max='100' placeholder='0'/>
                        </div>
                      </div>
                    </div>
                  </div>  
                )
              }

              <div className='column is-narrow '>
                <button className='button is-success' type='button' onClick={() => addColumn(i)}>
                  <span className="icon is-small">
                    <i className="fas fa-plus" aria-hidden="true"/>
                  </span>
                </button>
              </div>

              <div className='column is-narrow'>
                <button className='button is-danger' type='button' onClick={() => deleteRow(i)}>
                  <span className="icon is-small">
                    <i className="fas fa-trash" aria-hidden="true"/>
                  </span>
                </button>
              </div>
            </div>  
          )
        }
        <button className='button is-success' type='button' onClick={addRow}>
          <span className="icon is-small">
            <i className="fas fa-plus" aria-hidden="true"/>
          </span>
          <span>Añadir Criterio</span>
        </button>
      </form>
    </section>
  )
}

export default RubricView;