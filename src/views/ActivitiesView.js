import React from 'react';
import ActivitiesCalendar from '../components/Activities/ActivitiesCalendar';

const ActivitiesView = () => {
  return (
    <section>
      <header className="section pb-0 columns">
        <div className="column">
          <h1 className="title is-4">Calendario de Actividades</h1>
          <ActivitiesCalendar/> 
        </div>
        <div className="column">
          <p>Hola</p>
        </div>
      </header>
    </section>
  )
}

export default ActivitiesView;