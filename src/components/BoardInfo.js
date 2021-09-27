import React, { useState } from 'react'
import StoryForm from './StoryForm';
import { setModalState } from '../utils/functions'

const BoardInfo = () => {
  const [modalState, setModal] = useState(false);

  return (
    <div className="box has-background-info">
      <h1 className="title is-4 has-text-light">Definición de Historias</h1>
      <h2 className="subtitle is-6 has-text-light">En esta actividad solo podrán definir historias, además de editarlas o eliminarlas. En estas solo podrán manipular el numero de historia, el titulo y la descripción.</h2>
      <p className="has-text-light">Fecha de Cierre: 05/09/2021</p>
      <p className="has-text-light">Tiempo Restante: 5 días</p>

      <button className="button is-success" onClick={() => setModalState(true, setModal)}>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Nueva Historia</span>
      </button>

      <StoryForm isActive={modalState} handleClose={() => setModalState(false, setModal)}/>
    </div>
  )
}

export default BoardInfo;