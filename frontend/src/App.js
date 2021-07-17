import './css/App.css';
import Navbar from './components/Navbar';
import Board from './components/Board';

function App() {
  return (
    <div className="has-background-light">
      <Navbar/>
        <div className= "section">
          <div className="container">
            <Board/>
          </div>
        </div>
    </div>
  );
}

export default App;
