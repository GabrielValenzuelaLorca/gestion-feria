import React, { useState } from "react";
import { DragDropContext} from "react-beautiful-dnd";
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
  },
  {
    id:4,
    content: "item 4",
    estado: "To Do",
    index: 0
  },
  {
    id:5,
    content: "item 5",
    estado: "To Do",
    index: 1
  }
]

const Board = (props) => {
  const {columns} = props
  let initialState = {}
  columns.forEach(column => 
    initialState[column] = data.filter(item => item.estado === column)
  )

  const [state, setState] = useState(initialState);

  const onDragEnd = (result) => {
    if (!result.destination || !result.source) 
      return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const source = result.source.droppableId;
    const dest = result.destination.droppableId;
    let newState = {};

    if (dest === source && destIndex === sourceIndex) 
      return;

    if (source === dest){
      const newList = Array.from(state[source].sort((a,b)=>a.index-b.index));
      const [removed] = newList.splice(sourceIndex, 1);
      newList.splice(destIndex, 0, removed);
      newList.map((item,index)=>{
        item.index = index;
        return item;
      });
      newState = {...state, [source]: newList};
    } else {
      const newListSource = Array.from(state[source].sort((a,b)=>a.index-b.index));
      const newListDest = Array.from(state[dest].sort((a,b)=>a.index-b.index));
      const [removed] = newListSource.splice(sourceIndex, 1);
      removed.estado = dest;
      newListDest.splice(destIndex, 0, removed);
      newListSource.map((item,index)=>{
        item.index = index;
        return item;
      });
      newListDest.map((item,index)=>{
        item.index = index;
        return item;
      });
      newState = {...state, [source]: newListSource, [dest]:newListDest};
    }

    setState(newState);
  } 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns">
        {columns.map(column => {
          return (
            <div className="column" key={column}>
              <StateDroppable stateItems={state[column]} id={column}/>
            </div>
          )
        })}
        
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
