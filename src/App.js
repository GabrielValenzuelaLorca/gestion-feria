import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StoriesView from "./views/StoriesView";
import ActivitiesView from "./views/ActivitiesView";
import LoginView from "./views/LoginView";
import ProfileView from "./views/ProfileView";
import NavbarLayout from "./components/NavbarLayout";
import DashboardView from "./views/DashboardView";
import DeliverablesView from "./views/DeliverablesView";
import RubricView from "./views/RubricView";
import UserListView from "./views/UserListView";
import useFetch from "./hooks/useFetch";
import { getUser } from "./services/user";
import { addUser } from "./store/slices/userSlice";

function App() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [fetchUser, isLoading] = useFetch(getUser, (user) => {
    dispatch(addUser(user));
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") && !userState.id)
      fetchUser(JSON.parse(sessionStorage.getItem("user")).id);
  }, [fetchUser, userState.id]);

  return (
    <>
      {isLoading ? (
        <progress className="progress is-primary" />
      ) : (
        <Router>
          {userState.id ? (
            <Routes>
              <Route path="/" element={<Navigate to="actividades" />}>
                <Route path="*" element={<Navigate to="actividades" />} />
              </Route>
              <Route
                path="historias"
                element={<NavbarLayout component={<StoriesView />} />}
              />
              <Route
                path="actividades"
                element={<NavbarLayout component={<ActivitiesView />} />}
              />
              <Route
                path="usuario"
                element={<NavbarLayout component={<ProfileView />} />}
              />
              <Route
                path="dashboard"
                element={<NavbarLayout component={<DashboardView />} />}
              />
              <Route
                path="entregables"
                element={<NavbarLayout component={<DeliverablesView />} />}
              />
              <Route
                path="rubricas"
                element={<NavbarLayout component={<RubricView />} />}
              />
              {["Administrador", "Profesor"].includes(userState.rol) && (
                <Route
                  path="usuarios"
                  element={<NavbarLayout component={<UserListView />} />}
                />
              )}
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="login" />}>
                <Route path="*" element={<Navigate to="login" />} />
              </Route>
              <Route path="login" element={<LoginView />} />
            </Routes>
          )}
        </Router>
      )}
    </>
  );
}

export default App;
