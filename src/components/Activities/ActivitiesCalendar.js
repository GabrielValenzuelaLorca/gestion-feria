import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import "../../sass/calendar.sass";
import { setModalState } from "../../utils/functions";
import { useMemo } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const ActivitiesCalendar = ({ activities, setModal, setCurrentActivity }) => {
  const user = useSelector((state) => state.user);
  const getEndDate = useCallback((activity) => {
    const date = new Date(activity.end.replaceAll("/", "-"));
    date.setDate(date.getDate() + 2);
    return date;
  }, []);

  const parseActivities = useMemo(
    () =>
      activities.map((activity) => ({
        id: activity.id,
        start: activity.start.replaceAll("/", "-"),
        end: activity.start !== activity.end ? getEndDate(activity) : null,
        title: activity.name,
        backgroundColor: "#999",
        borderColor: "#999",
        allDay: true,
      })),
    [activities, getEndDate]
  );

  return (
    <section className="calendar box">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={parseActivities}
        eventClick={(e) => {
          if (["Administrador", "Profesor"].includes(user.rol)) {
            setCurrentActivity(
              activities.find((activity) => activity.id === e.event.id)
            );
            setModalState(true, setModal);
          }
        }}
        locale={esLocale}
        navLinks={false}
        height="auto"
        contentHeight="auto"
        aspectRatio={1}
      />
    </section>
  );
};

export default ActivitiesCalendar;
