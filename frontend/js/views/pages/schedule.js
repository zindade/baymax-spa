
import { initCalendar } from "../components/calendar/fullcalendar-wrapper.js";
import { openEventModal } from "../components/schedule/eventModal.js";
import { buildScheduleToolbar } from "../components/schedule/toolbar.js";
import { loadEvents, saveEventsFromCalendar, clearAll } from "../../services/schedule/eventStore.js";
import { addConsultation, seedOneConsultationPerDoctor } from "../../services/schedule/consultationRules.js";

export default function renderSchedule() {
  const container = document.createElement("div");
  container.className = "container";

  const h1 = document.createElement("h1");
  h1.className = "mb-3";
  h1.textContent = "My Medication Schedule";
  container.appendChild(h1);

  const toolbar = buildScheduleToolbar({
    onSeed: () => seedOneConsultationPerDoctor(calendar),
    onClear: () => { if (confirm("delete event?")) clearAll(calendar); },
    onNew: () => openEventModal({}, { onCreate: handleCreate })
  });
  container.appendChild(toolbar);

  const calEl = document.createElement("div");
  container.appendChild(calEl);


  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    calendar = initCalendar(calEl, {
      initialEvents: loadEvents(),
      onSelect: (info, cal) => openEventModal(
        { start: info.start, end: info.end, allDay: info.allDay },
        { onCreate: handleCreate }
      )
    });
  });

  let calendar = null;

  function handleCreate(payload) {
    if (!calendar) return;

    if (payload.type === "med") {
      calendar.addEvent({
        title: payload.title,
        start: payload.start,
        end: payload.end,
        allDay: payload.allDay,
        extendedProps: { type: "med" }
      });
      saveEventsFromCalendar(calendar);
    } else if (payload.type === "doctor appointment ") {
      addConsultation(calendar, {
        doctor: payload.doctor,
        start: payload.start,
        end: payload.end,
        allDay: payload.allDay
      });
    }
  }

  return container;
}
