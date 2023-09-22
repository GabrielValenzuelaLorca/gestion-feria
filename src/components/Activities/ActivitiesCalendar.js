import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../../sass/calendar.sass";
import { setModalState } from "../../utils/functions";
import { useMemo } from "react";

const ActivitiesCalendar = ({ activities, setModal, setCurrentActivity }) => {
  const parseActivities = useMemo(
    () =>
      activities.map((activity) => ({
        id: activity.id,
        start: activity.start !== activity.end ? activity.start : activity.end,
        end:
          activity.start !== activity.end
            ? new Date(new Date(activity.end).getTime() + 2 * 86400000)
            : null,
        title: activity.name,
        backgroundColor: "#999",
        borderColor: "#999",
        allDay: true,
      })),
    [activities]
  );

  return (
    <section className="calendar box">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        rerenderDelay={5}
        events={parseActivities}
        eventClick={(e) => {
          setCurrentActivity(
            activities.find((activity) => activity.id === e.event.id)
          );
          setModalState(true, setModal);
        }}
        locale={esLocale}
        height="auto"
        navLinks={false}
      />
    </section>
  );
};

export default ActivitiesCalendar;
