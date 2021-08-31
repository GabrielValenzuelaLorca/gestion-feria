const functions = {

  newStory: (story) => { 
    return {
      id: story.id,
      titulo: story.titulo,
      estado: "Backlog",
      numero: story.numero,
      avance: 0,
      puntos: 0,
      criticidad: "Bajo",
      sprint: "Sin Definir",
      descripcion: story.descripcion,
      criterios: "",
      responsables: [],
      index: story.index
    }
  },

  setModalState: (state, setState) => {
    const root = document.getElementById("html"); 
    if ( state )
      root.classList.add("is-clipped");
    else
      root.classList.remove("is-clipped");
    
    setState(state);
  }
}

export default functions;