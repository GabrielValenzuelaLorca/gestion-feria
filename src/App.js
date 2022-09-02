import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StoriesView from './views/StoriesView';
import ActivitiesView from './views/ActivitiesView';
import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import NavbarLayout from './components/NavbarLayout';
import DashboardView from './views/DashboardView';
import DeliverablesView from './views/DeliverablesView';
import RubricView from './views/RubricView';
import UserListView from './views/UserListView';

function App() {
  const userState = useSelector(state => state.user);

  useEffect(() => {
    window.onbeforeunload = () => {
      sessionStorage.setItem('user', JSON.stringify(userState));
    };

    return () => {
      window.onbeforeunload = null;
    }
  }, [userState])

  return (
    <Router>
      {
        userState.id ?
          <Routes>
            <Route path="/" element={<Navigate to="actividades"/>}>
              <Route path="*" element={<Navigate to="actividades"/>}/>
            </Route>
            <Route path="historias" element={<NavbarLayout component={<StoriesView/>}/>}/>
            <Route path="actividades" element={<NavbarLayout component={<ActivitiesView/>}/>}/>
            <Route path="usuario" element={<NavbarLayout component={<ProfileView/>}/>}/>
            <Route path="dashboard" element={<NavbarLayout component={<DashboardView/>}/>}/>
            <Route path="entregables" element={<NavbarLayout component={<DeliverablesView/>}/>}/>
            <Route path="rubricas" element={<NavbarLayout component={<RubricView/>}/>}/>
            {
              ['Administrador', 'Profesor'].includes(userState.rol) &&
                <Route path="usuarios" element={<NavbarLayout component={<UserListView/>}/>}/>
            }
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
