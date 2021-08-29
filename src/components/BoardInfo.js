import React, { useState } from 'react'
import StoryForm from './StoryForm';

const BoardInfo = () => {
  const [modalState, setModal] = useState(false);

  const handleState = (state) => {
    const root = document.getElementById("html"); 

    if ( state )
      root.classList.add("is-clipped");
    else
      root.classList.remove("is-clipped");
    
      setModal(state);
  }

  return (
    <div className="box has-background-info">
      <h1 className="title is-4 has-text-light">Definición de Historias</h1>
      <h2 className="subtitle is-6 has-text-light">Solo se podrán definir historias</h2>

      <button className="button is-success" onClick={() => handleState(true)}>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Nueva Historia</span>
      </button>

      <StoryForm isActive={modalState} handleClose={() => handleState(false)}/>
    </div>
  )
}

export default BoardInfo;