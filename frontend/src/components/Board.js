import React, { useState } from "react";
import { DragDropContext} from "react-beautiful-dnd";
import StateDroppable from "./StateDroppable";

const data = [
  {
    id:1,
    titulo: "Crear tablero de historias de usuario",
    estado: "Backlog",
    avance: 50,
    puntos: 10,
    criticidad: "Medio",
    index: 0
  },
  {
    id:2,
    titulo: "item 2",
    estado: "Backlog",
    avance: 70,
    puntos: 5,
    criticidad: "Medio",
    index: 1
  },
  {
    id:3,
    titulo: "item 3",
    estado: "Backlog",
    avance: 100,
    puntos: 7,
    criticidad: "Bajo",
    index: 2
  },
  {
    id:4,
    titulo: "item 4",
    estado: "To Do",
    avance: 55,
    puntos: 2,
    criticidad: "Alto",
    index: 0
  },
  {
    id:5,
    titulo: "item 5",
    estado: "To Do",
    avance: 10,
    puntos: 2,
    criticidad: "Medio",
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
