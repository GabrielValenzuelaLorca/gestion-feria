import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StoriesView from './views/StoriesView';
import ActivitiesView from './views/ActivitiesView';
import LoginView from './views/LoginView';
import UserView from './views/UserView';
import NavbarLayout from './components/NavbarLayout';
import TeamView from './views/TeamView';
import DashboardView from './views/DashboardView';
import DeliverablesView from './views/DeliverablesView';

function App() {
  const userState = useSelector(state => state.user);
  return (
    <Router>
      {
        userState ?
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="actividades"/>}>
                <Route path="*" element={<Navigate to="actividades"/>}/>
              </Route>
              <Route path="historias" element={<NavbarLayout component={<StoriesView/>}/>}/>
              <Route path="actividades" element={<NavbarLayout component={<ActivitiesView/>}/>}/>
              <Route path="usuario" element={<NavbarLayout component={<UserView/>}/>}/>
              <Route path="equipo" element={<NavbarLayout component={<TeamView/>}/>}/>
              <Route path="dashboard" element={<NavbarLayout component={<DashboardView/>}/>}/>
              <Route path="entregables" element={<NavbarLayout component={<DeliverablesView/>}/>}/>
            </Routes>
          </div> 
      :
        <Routes>
          <Route path="/" element={<Navigate to='login'/>}>
            <Route path="*" element={<Navigate to='login'/>}/>
          </Route>
          <Route path="login" element={<LoginView/>}/>
        </Routes>
      }
    </Router>
  );
}

export default App;
