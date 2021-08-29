import React, { useState } from "react";
import { DragDropContext} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import StateDroppable from "./StateDroppable";

const Board = ({columns}) => {
  const dispatch = useDispatch();
  const stories = useSelector(state => state.storiesReducer)
  
  let initialState = {}
  columns.forEach(column => 
    initialState[column] = stories.filter(item => item.estado === column)
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
              <h1 className="is-size-4 has-text-left has-text-weight-medium is-family-primary">
                {column}
              </h1>
              <StateDroppable stateItems={state[column]} id={column}/>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  );
}

export default Board;
