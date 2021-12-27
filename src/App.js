import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StoriesView from './views/StoriesView';
import ActivitiesView from './views/ActivitiesView';
import LoginView from './views/LoginView';

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" 
          element={
            window.sessionStorage.getItem('user') ? 
              <Navigate to="actividades"/> 
            :
              <Navigate to='login'/>
          }/>
        <Route path="login" element={<LoginView/>}/>
        <Route path="historias" element={<StoriesView/>}/>
        <Route path="actividades" element={<ActivitiesView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
