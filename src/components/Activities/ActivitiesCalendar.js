import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import '../../css/calendar.css'

const ActivitiesCalendar = ({activities}) => {
  const parseActivities = () => activities.map(activity => (
    {
      id: activity.id,
      start: activity.inicio !== activity.termino ? activity.inicio : activity.termino,
      end: activity.inicio !== activity.termino ? new Date(new Date(activity.termino).getTime()+(2 * 86400000)) : null,
      title: activity.nombre,
      backgroundColor: "#999",
      borderColor: "#999",
      allDay: true
    }
  ))

  return (
    <section className="calendar box">
      <FullCalendar
        plugins = {[ dayGridPlugin, interactionPlugin  ]}
        events = {parseActivities()}
        eventClick = {
          e => console.log(e)
        }
        locale = {esLocale}
        height = "auto"
        navLinks = {false}
      />
    </section>
  )
}

export default ActivitiesCalendar;