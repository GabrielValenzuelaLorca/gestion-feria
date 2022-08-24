import React from 'react';
import { diffDates, setModalState } from '../../utils/functions';

const ActivityCard = ({activity, setModal, setCurrentActivity}) => {
  return (
    <div className="card block">
      <div className="card-header">
        <h2 className="card-header-title">
          {activity.nombre}
        </h2>

        <button className="mt-1 mr-1 button is-light is-rounded" 
          onClick={() => {
            setCurrentActivity(activity);
            setModalState(true, setModal);
          }}
        >
          <span className="icon" >
            <i className="fas fa-lg fa-ellipsis-v"></i>
          </span>
        </button>
      </div>

      <div className="card-content">
        <p className="is-size-5">{activity.descripcion}</p>
      </div>

      <div className="card-footer">
        <p className="card-footer-item">Duración: {diffDates(activity.inicio, activity.termino)} día(s)</p>
        <p className="card-footer-item">Tiempo Restante: {diffDates(new Date(), activity.termino)} día(s)</p>
      </div>
    </div>
  )
}

export default ActivityCard;