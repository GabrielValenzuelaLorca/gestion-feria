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
      start: activity.duracion ? activity.inicio : activity.final,
      end: activity.duracion ? new Date(new Date(activity.final).getTime()+(2 * 86400000)) : null,
      title: activity.nombre,
      backgroundColor: "#999",
      borderColor: "#999",
      allDay: true
    }
  ))
  
  parseActivities()
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