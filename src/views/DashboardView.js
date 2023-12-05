import React from "react";
import Card from "../components/Dashboard/Card";
import useFetch from "../hooks/useFetch";
import { dashboard } from "../services/team";
import { useState } from "react";
import { useEffect } from "react";

const DashboardView = () => {
  const [dashboardState, setDashboard] = useState([]);
  const [fetchDashboard, loading] = useFetch(dashboard, setDashboard);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <section className="section">
      <h1 className="title">Dashboard</h1>
      {loading ? (
        <progress className="progress is-primary"></progress>
      ) : dashboardState.length > 0 ? (
        <div className="columns is-multiline">
          {dashboardState.map((team, i) => (
            <div className="column is-3" key={i}>
              <Card team={team} />
            </div>
          ))}
        </div>
      ) : (
        <p className="notification">No hay equipos creados</p>
      )}
    </section>
  );
};

export default DashboardView;
