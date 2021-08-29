import React from "react";
import { Draggable } from "react-beautiful-dnd";

const CardDraggable = ({item}) => {
  return (
    <Draggable draggableId={item.id.toString()} index={item.index}>
      {(provided, snapshot) => (
        <div className={`card mb-3 has-background-${snapshot.isDragging ? "grey-light" : "light"}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <a className="card-header" href="youtube.com">
            <p className="card-header-title">
              HU0{item.id} - {item.titulo}
            </p>
          </a>
          <div className="card-content py-2" href="youtube.com">
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
              <li className="is-size-7">Gabriel Valenzuela</li>
              <li className="is-size-7">Pedro Godoy</li>
            </ul>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default CardDraggable;