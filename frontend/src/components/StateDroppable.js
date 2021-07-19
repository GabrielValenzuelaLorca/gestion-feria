import React from "react";
import { Droppable } from "react-beautiful-dnd";
import CardDraggable from "./CardDraggable";

const StateDroppable = (props) => {
  const {stateItems, id} = props

  return (
    <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className= {`box has-background-${
              {
                "Backlog": "danger",
                "To Do": "info",
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