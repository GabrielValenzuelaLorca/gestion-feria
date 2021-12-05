import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoriesView from './views/StoriesView';
import ActivitiesView from './views/ActivitiesView';

function App() {
  return (
    <Router>
      <header>
        <Navbar/>
      </header>

      <Switch>
        <Route exact path="/">
          <StoriesView/>
        </Route>

        <Route path="/actividades">
          <ActivitiesView/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
