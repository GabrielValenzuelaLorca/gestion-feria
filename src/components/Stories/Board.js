import React from "react";
import { DragDropContext} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { updateStories } from "../../store/slices/storySlice";
import StateDroppable from "./StateDroppable";

const Board = ({columns}) => {
  const dispatch = useDispatch();
  const stories = useSelector(state => state.stories)
  let stories_by_column = {}

  columns.forEach(column => 
    stories_by_column[column] = stories.filter(item => item.estado === column)
  )

  const onDragEnd = (result) => {
    if (!result.destination || !result.source) 
      return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const source = result.source.droppableId;
    const dest = result.destination.droppableId;
    let payload = [];

    if (dest === source && destIndex === sourceIndex) 
      return;

    if (source === dest){
      const newList = Array.from(stories_by_column[source].sort((a,b)=>a.index-b.index));
      const [removed] = newList.splice(sourceIndex, 1);
      newList.splice(destIndex, 0, removed);

      newList.map((item,index)=>{
        item.index = index;
        return item;
      });

      payload = newList;

    } else {
      const newListSource = Array.from(stories_by_column[source].sort((a,b)=>a.index-b.index));
      const newListDest = Array.from(stories_by_column[dest].sort((a,b)=>a.index-b.index));
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
      payload = [...newListSource, ...newListDest];
    }

    dispatch(updateStories(payload));
  } 

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className="columns">
        {columns.map(column => {
          return (
            <div className="column" key={column}>
              <h2 className="is-size-4 has-text-weight-medium">
                {column}
              </h2>
              <StateDroppable stateItems={stories_by_column[column]} id={column}/>
            </div>
          )
        })}
      </section>
    </DragDropContext>
  );
}

export default Board;
