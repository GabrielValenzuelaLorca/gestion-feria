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
import { useCallback } from "react";
import { getAppActivities } from "./services/activity";
import { setActivities } from "./store/slices/activitiesSlice";
import { updateSettings } from "./store/slices/settingsSlice";
import TeamStoriesView from "./views/TeamStoriesView";
import DetailedEvaluationView from "./views/DetailedEvaluationView";

function App() {
  const userState = useSelector((state) => state.user);
  const periodState = useSelector((state) => state.period);
  const activityState = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const [fetchUser] = useFetch(
    getUser,
    useCallback((user) => dispatch(addUser(user)), [dispatch])
  );
  const [fetchPeriod] = useFetch(
    getActivePeriod,
    useCallback((period) => dispatch(addPeriod(period)), [dispatch])
  );
  const [fetchActivities] = useFetch(
    getAppActivities,
    useCallback(
      (activities) => {
        dispatch(setActivities(activities));
        dispatch(updateSettings(activities));
      },
      [dispatch]
    )
  );

  useEffect(() => {
    if (userState.id && !userState.rol) fetchUser(userState.id);
  }, [fetchUser, userState.id, userState.rol]);

  useEffect(() => {
    if (!periodState.id) fetchPeriod();
  }, [fetchPeriod, periodState.id]);

  useEffect(() => {
    if (userState.id && !activityState) fetchActivities();
  }, [fetchActivities, activityState, userState.id]);

  return (
    <Router>
      {!userState.id ? (
        <Routes>
          <Route path="/" element={<Navigate to="login" />}>
            <Route path="*" element={<Navigate to="login" />} />
          </Route>
          <Route path="login" element={<LoginView />} />
        </Routes>
      ) : !userState.rol || !periodState.id || !activityState ? (
        <progress className="progress is-primary" />
      ) : (
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
            path="evaluacion/:deliverableId"
            element={<NavbarLayout component={<EvaluateView />} />}
          />
          <Route
            path="evaluacionDetallada/:deliverableId"
            element={<NavbarLayout component={<DetailedEvaluationView />} />}
          />
          <Route
            path="rubrica/:activityId"
            element={<NavbarLayout component={<RubricView />} />}
          />

          {["Administrador", "Profesor"].includes(userState.rol) && (
            <>
              <Route
                path="entregables"
                element={<NavbarLayout component={<AllDeliverablesView />} />}
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
                path="historias/:teamId"
                element={<NavbarLayout component={<TeamStoriesView />} />}
              />
              <Route
                path="dashboard"
                element={<NavbarLayout component={<DashboardView />} />}
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
      )}
    </Router>
  );
}

export default App;
