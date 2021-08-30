const functions = {
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