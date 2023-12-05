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
          {stateItems.map((item) => (
            <CardDraggable item={item} key={item.id} />
          ))}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
  );
};

export default StateDroppable;
