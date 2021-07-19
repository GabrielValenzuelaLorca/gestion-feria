import './css/App.css';
import Navbar from './components/Navbar';
import Board from './components/Board';

function App() {
  return (
    <div>
      <Navbar/>
        <div className= "section">
          <div className="container">
            <Board columns={["Backlog", "To Do", "In Progress", "Done"]}/>
          </div>
        </div>
    </div>
  );
}

export default App;
