import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import '../../sass/calendar.sass'
import { setModalState } from '../../utils/functions';

const ActivitiesCalendar = ({activities, setModal, setCurrentActivity}) => {
  const parseActivities = () => activities.map(activity => ({
    id: activity.id,
    start: activity.inicio !== activity.termino ? activity.inicio : activity.termino,
    end: activity.inicio !== activity.termino ? new Date(new Date(activity.termino).getTime()+(2 * 86400000)) : null,
    title: activity.nombre,
    backgroundColor: "#999",
    borderColor: "#999",
    allDay: true
  }));

  return (
    <section className="calendar box">
      <FullCalendar
        plugins = {[ dayGridPlugin, interactionPlugin]}
        events = {parseActivities()}
        eventClick = {(e) => {
          setCurrentActivity(activities.find(activity => activity.id === e.event.id));
          setModalState(true, setModal);
        }}
        locale = {esLocale}
        height = "auto"
        navLinks = {false}
      />
    </section>
  )
}

export default ActivitiesCalendar;