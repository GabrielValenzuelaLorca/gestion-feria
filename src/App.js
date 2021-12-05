import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect,withRouter } from 'react-router-dom';
import StoriesView from './views/StoriesView';
import ActivitiesView from './views/ActivitiesView';
import LoginView from './views/LoginView';

const NavbarWithRouter = withRouter(Navbar);

function App() {
  return (
    <Router>
      <NavbarWithRouter/>
      <Switch>
        <Route path="/login">
          {
            window.sessionStorage.getItem('user') ? 
              <Redirect to="/actividades"/>
            :
              <LoginView/>
          }
        </Route>
        <Route path="/historias" component={StoriesView}/>
        <Route path="/actividades" component={ActivitiesView}/>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
