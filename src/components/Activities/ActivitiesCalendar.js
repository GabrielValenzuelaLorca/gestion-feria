import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import '../../css/calendar.css'

const ActivitiesCalendar = () => {
  // const [value, onChange] = useState(new Date());

  return (
    <section className="calendar box">
      <FullCalendar
        plugins = {[ dayGridPlugin, interactionPlugin  ]}
        events = {[
          { title: 'event 1', date: '2021-10-16' },
          { title: 'event 2', date: '2021-10-17' }
        ]}
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