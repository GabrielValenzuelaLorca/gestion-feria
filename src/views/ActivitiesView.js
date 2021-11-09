import React, { useState } from 'react';
import ActivitiesCalendar from '../components/Activities/ActivitiesCalendar';
import Activity from '../components/Activities/Activity';
import ActivityForm from '../components/Activities/ActivityForm';
import { diffDates, setModalState } from '../utils/functions';

const sample = {
  1:{
    id: 1,
    nombre: "Evento 1",
    inicio: "2021-10-16",
    termino: "2021-10-23",
    atraso: false,
    cierre: "2021-10-24",
    descripcion: "evento para mover historias",
    duracion: false
  },
  2:{
    id: 2,
    nombre: "Evento 2",
    inicio: '2021-10-17',
    termino: '2021-10-25',
    atraso: false,
    cierre: '2021-10-26',
    descripcion: "evento para crear historias",
    duracion: true,
  },
  3:{
    id: 3,
    nombre: "Evento 3",
    inicio: '2021-11-05',
    termino: '2021-11-10',
    atraso: false,
    cierre: '2021-11-11',
    descripcion: "evento para probar las tarjetas",
    duracion: true
  },
}

const ActivitiesView = () => {
  const [activitiesState, setActivities] = useState(sample);
  const [modalState, setModal] = useState(false);
  
  return (
    <section>
      <div className="section  columns">
        <div className="column">
          <h1 className="title is-4">Calendario de Actividades</h1>
          <ActivitiesCalendar 
            activities={Object.values(activitiesState)} 
          /> 
        </div>
        <div className="column">
          <div className="level mb-3">
            <div className="level-left">
              <h1 className="title is-4 level-item">Listado de Actividades</h1>
            </div>
            <div className="level-right">
              <button className="button is-success" onClick={() => setModalState(true, setModal)}>
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                
                <span>Nueva Actividad</span>
              </button>
            </div>
          </div>
          { 
            Object.values(activitiesState)
              .filter(activity => diffDates(new Date(), activity.termino) > 0)
              .length > 0
            ? Object.values(activitiesState)
                .filter(activity => diffDates(new Date(), activity.termino) > 0)
                .sort((a,b) => new Date(a.termino).getTime() - new Date(b.termino).getTime())
                .map(activity => 
                  <Activity 
                    key={activity.id}
                    activity={activity}
                />)
            : <p className="notification">
                No hay actividades por realizar en este momento
              </p>
          }
        </div>
      </div>

      <ActivityForm 
        isActive={modalState} 
        closeModal={() => setModalState(false, setModal)}
        activitiesState={activitiesState}
        setActivities={setActivities}
      />
    </section>
  )
}

export default ActivitiesView;