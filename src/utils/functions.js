export const newStory = (story) => { 
  return {
    id: story.id,
    titulo: story.titulo,
    estado: story.estado || "Backlog" ,
    numero: parseInt(story.numero, 10),
    avance: parseInt(story.avance, 10) || 0,
    puntos: parseInt(story.puntos, 10) || 0,
    criticidad: story.criticidad || "Opcional",
    sprint: story.sprint || "Sin Definir",
    descripcion: story.descripcion,
    criterios: story.criterios || "",
    responsables: story.responsables || [],
    index: story.index
  }
}

export const newActivity = (activity) => {
  return {
    [activity.id]:{
      atraso:false,
      cierre:null,
      ...activity
    }
  }
}

export const setModalState = (state, setState) => {
  const root = document.getElementById("html"); 
  if ( state )
    root.classList.add("is-clipped");
  else
    root.classList.remove("is-clipped");
  
  setState(state);
}

export const addToRefs = (ref, element) => {
  if (element && !ref.current.includes(element))
      ref.current.push(element);
}

export const diffDates = (initial, final) => {
  const diff = new Date(final).getTime() - new Date(initial).getTime();
  return Math.ceil(diff / (1000 * 3600 * 24) + 1)
}

export const validate = (validState) => {
  return Object.values(validState).reduce((acc,next) => {
    return acc && next;
  }, true)
}