import React from "react";
import { Droppable } from "react-beautiful-dnd";
import CardDraggable from "./CardDraggable";

const columnStyle = {
  "Por Hacer": "danger",
  "En Progreso": "warning",
  Testing: "link",
  Terminado: "success",
};

const StateDroppable = ({ stateItems, id }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <section
          className={`box has-background-${columnStyle[id]}${
            snapshot.isDraggingOver ? "-dark" : ""
          }`}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {stateItems.length > 0 ? (
            stateItems.map((item) => (
              <CardDraggable item={item} key={item.id} />
            ))
          ) : (
            <p className="tag is-primary is-light is-rounded">Sin Historias</p>
          )}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
};

export default StateDroppable;
