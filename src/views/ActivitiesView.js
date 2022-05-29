import React, { useEffect, useState } from 'react';
import ActivitiesCalendar from '../components/Activities/ActivitiesCalendar';
import Activity from '../components/Activities/Activity';
import ActivityForm from '../components/Activities/ActivityForm';
import useFetch from '../hooks/useFetch';
import { getActivities } from '../services/activity';
import { diffDates, setModalState } from '../utils/functions';

const ActivitiesView = () => {
  const [activitiesState, setActivities] = useState([]);
  const [fetchActivities, isLoading] = useFetch(getActivities, setActivities);
  const [modalState, setModal] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities])
  
  return (
    <section>
      <div className="section columns">
        <div className="column">
          <h1 className="title is-4">Calendario de Actividades</h1>
            <ActivitiesCalendar 
              activities={activitiesState}
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
            isLoading 
            ? <progress className='progress is-primary'/>
            : activitiesState
                .filter(activity => diffDates(new Date(), activity.termino) > 0)
                .length > 0
              ? activitiesState
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
      />
    </section>
  )
}

export default ActivitiesView;