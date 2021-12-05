import React from 'react';
import BoardInfo from '../components/Stories/BoardInfo';
import Board from '../components/Stories/Board';

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