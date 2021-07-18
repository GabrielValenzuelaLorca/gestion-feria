import React, { useState } from "react";
import { DragDropContext} from "react-beautiful-dnd";
import { reorder } from "../utils/functions";
import StateDroppable from "./StateDroppable";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const Board = () => {
  const [stateItems, setItems] = useState(getItems(5))

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      stateItems,
      result.source.index,
      result.destination.index
    );

    setItems(items);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StateDroppable stateItems={stateItems}/>
    </DragDropContext>
  );
}

export default Board;
