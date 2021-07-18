import React from "react";
import { Draggable } from "react-beautiful-dnd";

const CardDraggable = (props) => {
  const {item, index} = props

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div className="box has-background-success "
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  )
}

export default CardDraggable;