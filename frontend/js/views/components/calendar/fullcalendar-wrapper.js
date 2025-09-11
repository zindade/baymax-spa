
import { saveEventsFromCalendar } from "../../../services/schedule/eventStore.js";

export function initCalendar(calendarEl, { initialEvents=[], onSelect } = {}) {
  const FC = window.FullCalendar;
  if (!FC || !FC.Calendar) {
    calendarEl.innerHTML = `<div class="alert alert-danger">Falha ao carregar o calendário.</div>`;
    return null;
  }

  const calendar = new FC.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    selectable: true,
    editable: true,
    nowIndicator: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: initialEvents,
    select: (info) => onSelect && onSelect(info, calendar),
    eventChange: () => saveEventsFromCalendar(calendar),
    eventAdd:    () => saveEventsFromCalendar(calendar),
    eventRemove: () => saveEventsFromCalendar(calendar),
    eventClassNames: (arg) =>
      arg.event.extendedProps?.type === "consulta" ? ["event-consulta"] : []
  });

  calendar.render();
  return calendar;
}
