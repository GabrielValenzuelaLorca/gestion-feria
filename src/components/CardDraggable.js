import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import functions from "../utils/functions";
import StoryDetails from "./StoryDetails";

const CardDraggable = ({item}) => {
  const [modalState, setModal] = useState(false);

  return (
    <Draggable draggableId={item.id.toString()} index={item.index}>
      {(provided, snapshot) => (
        <div>
          <div className={`card mb-3 has-background-${snapshot.isDragging ? "grey-light" : "light"}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card-header">
              <p className="card-header-title">
                  HU{item.numero} - {item.titulo}
              </p>
              <button className="card-header-icon" onClick={() => functions.setModalState(true, setModal)}>
                <span className="icon has-text-grey-light" 
                  onMouseOver={(e) => e.target.classList.remove('has-text-grey-light')}
                  onMouseLeave={(e) => e.target.classList.add('has-text-grey-light')}>
                  <i className="fas fa-external-link-alt"></i>
                </span>
              </button>
            </div>
            <div className="card-content py-2">
              <progress className="progress is-link mb-2" value={item.avance.toString()} max="100"/>
              <span className="icon-text level mb-0">
                <span className={`icon level-left has-text-${
                  {Alto: "danger",
                  Medio: "warning",
                  Bajo: "success"}[item.criticidad]}`}
                >
                  <i className="fas fa-circle"></i>
                </span>
                <span className="level-right tag is-primary is-rounded">{item.puntos} Ptos.</span>
              </span>
              <span className="has-text-weight-medium">Responsables:</span>
              <ul className="pl-2">
                {item.responsables.length ?
                  item.responsables.map((responsable, index) => 
                    <li className="is-size-7" key={index}>{responsable}</li>
                  ) :  
                  <li className="is-size-7">Sin Responsables</li>
                }
              </ul>
            </div>
          </div>
          <StoryDetails story={item} isActive={modalState} handleClose={() => functions.setModalState(false, setModal)}/>
        </div>
      )}
    </Draggable>
  )
}

export default CardDraggable;