import React from 'react'
import Navbar from './components/Navbar';
import Board from './components/Board';
import BoardInfo from './components/BoardInfo';

function App() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>

      <header className= "section pb-0">
        <BoardInfo/>
      </header>

      <section className= "section">
        <Board columns={["Backlog", "Por Hacer", "En Desarrollo", "Completado"]}/>
      </section>
    </div>
  );
}

export default App;
