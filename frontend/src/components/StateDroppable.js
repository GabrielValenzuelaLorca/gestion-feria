import React from "react";
import { Droppable } from "react-beautiful-dnd";
import CardDraggable from "./CardDraggable";

const StateDroppable = (props) => {
  const {stateItems} = props

  return (
    <Droppable droppableId="droppable" key="1">
        {(provided, snapshot) => (
          <div
            className= "box"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {stateItems.map((item, index) => (
              <CardDraggable item={item} index={index} key={item.id.toString()}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
  )
}

export default StateDroppable;