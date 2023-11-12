import React, { useEffect, useState } from "react";
import ActivitiesCalendar from "../components/Activities/ActivitiesCalendar";
import Activity from "../components/Activities/ActivityCard";
import ActivityForm from "../components/Activities/ActivityForm";
import useFetch from "../hooks/useFetch";
import { getActivities } from "../services/activity";
import { diffDates, setModalState } from "../utils/functions";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const defaultActivity = {
  name: "",
  type: "",
  start: "",
  end: "",
  delay: false,
  close: "",
  description: "",
};

const ActivitiesView = () => {
  const [activitiesState, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState(defaultActivity);
  const [modalState, setModal] = useState(false);
  const [fetchActivities, isLoading] = useFetch(getActivities, setActivities);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const calendar = useMemo(() => {
    return (
      <ActivitiesCalendar
        activities={activitiesState}
        setModal={setModal}
        setCurrentActivity={setCurrentActivity}
      />
    );
  }, [activitiesState]);

  return (
    <section className="section columns">
      <div className="column">
        <h1 className="title is-3 mb-4">Calendario de Actividades</h1>

        {calendar}
      </div>
      <div className="column">
        <div className="level mb-3">
          <div className="level-left">
            <h1 className="title is-3 level-item">Listado de Actividades</h1>
          </div>
          <div className="level-right">
            {["Administrador", "Profesor"].includes(user.rol) && (
              <button
                className="button is-success"
                onClick={() => {
                  setCurrentActivity(defaultActivity);
                  setModalState(true, setModal);
                }}
              >
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>

                <span>Nueva Actividad</span>
              </button>
            )}
          </div>
        </div>
        {isLoading ? (
          <progress className="progress is-primary" />
        ) : activitiesState.filter(
            (activity) => diffDates(new Date(), activity.end) >= 0
          ).length ? (
          activitiesState
            .filter((activity) => diffDates(new Date(), activity.end) >= 0)
            .sort(
              (a, b) => new Date(a.end).getTime() - new Date(b.end).getTime()
            )
            .map((activity) => (
              <Activity
                key={activity.id}
                activity={activity}
                setModal={setModal}
                setCurrentActivity={setCurrentActivity}
              />
            ))
        ) : (
          <p className="notification">
            No hay actividades por realizar en este momento
          </p>
        )}
      </div>

      <ActivityForm
        isActive={modalState}
        fetchActivities={fetchActivities}
        currentActivity={currentActivity}
        setCurrentActivity={setCurrentActivity}
        closeModal={() => setModalState(false, setModal)}
      />
    </section>
  );
};

export default ActivitiesView;
