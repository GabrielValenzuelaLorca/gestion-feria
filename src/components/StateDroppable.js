import React from "react";
import { Droppable } from "react-beautiful-dnd";
import CardDraggable from "./CardDraggable";
import { columnStyle } from '../utils/classStyles'

const StateDroppable = ({stateItems, id}) => {
  return (
    <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <section
            className= {`box has-background-${columnStyle[id] || "white"}`
            + `${snapshot.isDraggingOver ? "-dark" : ""}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {stateItems.map(item => (
              <CardDraggable item={item} key={item.id.toString()}/>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
  )
}

export default StateDroppable;