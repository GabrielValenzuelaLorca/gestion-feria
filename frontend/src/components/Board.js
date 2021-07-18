import React, { useState } from "react";
import { DragDropContext} from "react-beautiful-dnd";
import { reorder } from "../utils/functions";
import StateDroppable from "./StateDroppable";

const data = [
  {
    id:1,
    content: "item 1",
    estado: "Backlog",
    index: 0
  },
  {
    id:2,
    content: "item 2",
    estado: "Backlog",
    index: 1
  },
  {
    id:3,
    content: "item 3",
    estado: "Backlog",
    index: 2
  }
]

const Board = () => {
  const [stateItems, setItems] = useState(data)

  const onDragEnd = (result) => {
    console.log("aer", result)
    if (!result.destination || !result.source) 
      return;

    if (result.destination.droppableId === result.source.droppableId && 
      result.destination.index === result.source.index) 
      return;

    const NewItems = reorder(
      stateItems,
      result
    );
    setItems(NewItems);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns">
        <div className="column">
          <StateDroppable stateItems={stateItems} id="Backlog"/>
        </div>
        {/* <div className="column">
          <StateDroppable stateItems={stateItems2} id="To Do"/>
        </div> */}
        {/* <div className="column">
          <StateDroppable stateItems={stateItems} id="In Progress"/>
        </div>
        <div className="column">
          <StateDroppable stateItems={stateItems} id="Done"/>
        </div> */}
      </div>
    </DragDropContext>
  );
}

export default Board;
