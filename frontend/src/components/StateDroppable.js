import React from "react";
import { Droppable } from "react-beautiful-dnd";
import CardDraggable from "./CardDraggable";

const StateDroppable = (props) => {
  const {stateItems, id} = props

  return (
    <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className= "box"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h1>{id}</h1>
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