export const reorder = (list, result) => {
  const sourceIndex = result.source.index;
  const destIndex = result.destination.index;
  const source = result.source.droppableId;
  const dest = result.destination.droppableId;
  let newList = [];

  if (source === dest){
    newList = Array.from(list.sort((a,b)=>a.index-b.index));
    const [removed] = newList.splice(sourceIndex, 1);
    newList.splice(destIndex, 0, removed);
    newList.map((item,index)=>{
      item.index = index;
      return item;
    });
  }

  return newList;
};