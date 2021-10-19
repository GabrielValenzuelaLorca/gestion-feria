import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import '../../css/calendar.css'

const ActivitiesCalendar = ({activities}) => {
  return (
    <section className="calendar box">
      <FullCalendar
        plugins = {[ dayGridPlugin, interactionPlugin  ]}
        events = {activities}
        eventClick = {
          e => console.log(e)
        }
        locale = {esLocale}
        aspectRatio = {1.25}
        navLinks = {false}
      />
    </section>
  )
}

export default ActivitiesCalendar;