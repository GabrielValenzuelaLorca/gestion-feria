const defaultState = [
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
];

const storiesReducer = (state = defaultState, {type, payload}) => {
  switch (type){
    case "UPDATE_STORIES":
      const modified_ids = payload.map(story => story.id)
      state.forEach(elem => {
        if(!modified_ids.includes(elem.id))
          payload.push(elem)
      })
      return [...payload]
    
    default:
      return state
  }
}

export default storiesReducer;