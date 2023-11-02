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
import { getActivePeriod } from "./services/period";
import { addPeriod } from "./store/slices/periodSlice";
import AllDeliverablesView from "./views/AllDeliverablesView";
import EvaluationsView from "./views/EvaluationsView";
import EvaluateView from "./views/EvaluateView";

function App() {
  const userState = useSelector((state) => state.user);
  const periodState = useSelector((state) => state.period);
  const dispatch = useDispatch();
  const [fetchUser, isUserLoading] = useFetch(getUser, (user) => {
    dispatch(addUser(user));
  });
  const [fetchPeriod, isPeriodLoading] = useFetch(getActivePeriod, (period) => {
    if (period) dispatch(addPeriod(period));
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") && !userState.id)
      fetchUser(JSON.parse(sessionStorage.getItem("user")).id);
  }, [fetchUser, userState.id]);

  useEffect(() => {
    if (userState.id && !periodState.id) fetchPeriod();
  }, [fetchPeriod, periodState.id, userState.id]);

  return (
    <>
      {isUserLoading || isPeriodLoading ? (
        <progress className="progress is-primary" />
      ) : (
        <Router>
          {userState.id ? (
            <Routes>
              <Route path="/" element={<Navigate to="actividades" />}>
                <Route path="*" element={<Navigate to="actividades" />} />
              </Route>
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

              {["Administrador", "Profesor"].includes(userState.rol) && (
                <>
                  <Route
                    path="entregables"
                    element={
                      <NavbarLayout component={<AllDeliverablesView />} />
                    }
                  />
                  <Route
                    path="rubrica/:activityId"
                    element={<NavbarLayout component={<RubricView />} />}
                  />
                  <Route
                    path="usuarios"
                    element={<NavbarLayout component={<UserListView />} />}
                  />
                  <Route
                    path="entregables/:activityId"
                    element={<NavbarLayout component={<EvaluationsView />} />}
                  />
                  <Route
                    path="evaluacion/:deliverableId"
                    element={<NavbarLayout component={<EvaluateView />} />}
                  />
                </>
              )}
              {"Alumno" === userState.rol && (
                <>
                  <Route
                    path="historias"
                    element={<NavbarLayout component={<StoriesView />} />}
                  />
                  <Route
                    path="entregables"
                    element={<NavbarLayout component={<DeliverablesView />} />}
                  />
                </>
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
