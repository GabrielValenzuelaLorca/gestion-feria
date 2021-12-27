import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StoriesView from './views/StoriesView';
import ActivitiesView from './views/ActivitiesView';
import LoginView from './views/LoginView';
import { useSelector } from 'react-redux';

function App() {
  const userState = useSelector(state => state.user);
  return (
    <Router>
      <Navbar/>
      {
        userState ? 
          <Routes>
            <Route path="/" element={<Navigate to="actividades"/>}>
              <Route path="*" element={<Navigate to="actividades"/>}/>
            </Route>
            <Route path="historias" element={<StoriesView/>}/>
            <Route path="actividades" element={<ActivitiesView/>}/>
          </Routes>
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
