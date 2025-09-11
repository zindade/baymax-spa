
import { STORAGE_KEY } from "./constants.js";

export function loadEvents() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}

export function saveEventsFromCalendar(calendar) {
  const events = calendar.getEvents().map(e => ({
    id: e.id,
    title: e.title,
    start: e.startStr,
    end: e.endStr,
    allDay: !!e.allDay,
    extendedProps: { ...(e.extendedProps || {}) }
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function clearAll(calendar) {
  calendar.getEvents().forEach(e => e.remove());
  localStorage.removeItem(STORAGE_KEY);
}
