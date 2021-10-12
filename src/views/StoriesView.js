import React from 'react';
import BoardInfo from '../components/BoardInfo';
import Board from '../components/Board';

const StoriesView = () => {
  return (
    <section>
      <header className= "section pb-0">
        <BoardInfo/>
      </header>

      <section className= "section">
        <Board columns={["Backlog", "Por Hacer", "En Desarrollo", "Completado"]}/>
      </section>
    </section>
  )
}

export default StoriesView;