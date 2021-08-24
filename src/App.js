import React from 'react'
import Navbar from './components/Navbar';
import Board from './components/Board';
import BoardInfo from './components/BoardInfo';

function App() {
  return (
    <div>
      <Navbar/>
      <div className= "section pb-0">
        <BoardInfo/>
      </div>
      <div className= "section">
        <Board columns={["Backlog", "To Do", "In Progress", "Done"]}/>
      </div>
    </div>
  );
}

export default App;
