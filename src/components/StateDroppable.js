import React from "react";
import { Droppable } from "react-beautiful-dnd";
import CardDraggable from "./CardDraggable";

const StateDroppable = ({stateItems, id}) => {
  return (
    <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className= {`box has-background-${
              {
                "Backlog": "danger",
                "To Do": "link",
                "In Progress": "warning",
                "Done": "success"
              }[id] || "white"
            }${snapshot.isDraggingOver ? "-dark" : ""}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {stateItems.map(item => (
              <CardDraggable item={item} key={item.id.toString()}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  )
}

export default StateDroppable;