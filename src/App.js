import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StoriesView from './views/StoriesView';
import ActivitiesView from './views/ActivitiesView';
import LoginView from './views/LoginView';
import UserView from './views/UserView';
import NavbarLayout from './components/NavbarLayout';

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
