import React, { useState } from 'react'
import StoryForm from './StoryForm';
import functions from '../utils/functions'

const BoardInfo = () => {
  const [modalState, setModal] = useState(false);

  return (
    <div className="box has-background-info">
      <h1 className="title is-4 has-text-light">Definición de Historias</h1>
      <h2 className="subtitle is-6 has-text-light">Solo se podrán definir historias</h2>

      <button className="button is-success" onClick={() => functions.setModalState(true, setModal)}>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Nueva Historia</span>
      </button>

      <StoryForm isActive={modalState} handleClose={() => functions.setModalState(false, setModal)}/>
    </div>
  )
}

export default BoardInfo;