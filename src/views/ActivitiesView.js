import React, { useState } from 'react';
import ActivitiesCalendar from '../components/Activities/ActivitiesCalendar';
import Activity from '../components/Activities/Activity';

const sample = {
  1:{
    id: 1,
    nombre: "Evento 1",
    inicio: "2021-10-16",
    final: "2021-10-23",
    atraso: false,
    cierre: "2021-10-24",
    descripcion: "evento para mover historias",
    duracion: false
  },
  2:{
    id: 2,
    nombre: "Evento 2",
    inicio: '2021-10-17',
    final: '2021-10-25',
    atraso: false,
    cierre: '2021-10-26',
    descripcion: "evento para crear historias",
    duracion: true,
  },
  3:{
    id: 3,
    nombre: "Evento 3",
    inicio: '2021-10-17',
    final: '2021-10-24',
    atraso: false,
    cierre: '2021-10-25',
    descripcion: "evento para probar las tarjetas",
    duracion: true
  },
}

const ActivitiesView = () => {
  const [activitiesState, setActivities] = useState(sample);
  return (
    <section>
      <header className="section pb-0 columns">
        <div className="column">
          <h1 className="title is-4">Calendario de Actividades</h1>
          <ActivitiesCalendar 
            activities={Object.values(activitiesState)} 
          /> 
        </div>
        <div className="column">
          <h1 className="title is-4">Listado de Actividades</h1>
          { Object.keys(activitiesState).length > 0
            ? Object.values(activitiesState)
                .sort((a,b) => new Date(a.final).getTime() - new Date(b.final).getTime())
                .map(activity => 
                  <Activity 
                    key={activity.id}
                    activity={activity}
                    setActivities={setActivities}
                />)
            : <p className="notification">
                No hay actividades en este momento
              </p>
          }
        </div>
      </header>
    </section>
  )
}

export default ActivitiesView;