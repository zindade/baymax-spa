// js/services/schedule/consultationRules.js
import { TEAM } from "./constants.js";
import { startOfWeek, endOfWeek } from "./dateUtils.js";
import { saveEventsFromCalendar } from "./eventStore.js";

export function isConsultation(ev) {
  return ev.extendedProps?.type === "consulta";
}

export function canScheduleDoctorInWeek(calendar, doctor, when) {
  const s = startOfWeek(when);
  const e = endOfWeek(when);
  const count = calendar.getEvents().filter(ev => {
    if (!isConsultation(ev)) return false;
    if (ev.extendedProps?.doctor !== doctor) return false;
    return ev.start >= s && ev.start < e;
  }).length;
  return count < 2; 
}

export function addConsultation(calendar, { doctor, start, end, allDay=false }) {
  if (!TEAM.includes(doctor)) {
    alert(`Médico inválido. Escolhe um de: ${TEAM.join(", ")}`);
    return false;
  }
  if (!canScheduleDoctorInWeek(calendar, doctor, start)) {
    alert(`${doctor} já tem 2 consultas nesta semana.`);
    return false;
  }
  calendar.addEvent({
    title: `Consulta - ${doctor}`,
    start, end, allDay,
    extendedProps: { type: "consulta", doctor }
  });
  saveEventsFromCalendar(calendar);
  return true;
}

export function seedOneConsultationPerDoctor(calendar) {

  const base = new Date();
  const dayIdx = (base.getDay() + 6) % 7; 
  const nextMonday = new Date(base);
  nextMonday.setDate(base.getDate() + (7 - dayIdx)); 

  TEAM.forEach((doc, i) => {
    const day = new Date(nextMonday);
    day.setDate(nextMonday.getDate() + i); 
    const start = new Date(day); start.setHours(10,0,0,0);
    const end   = new Date(day); end.setHours(10,30,0,0);
    canScheduleDoctorInWeek(calendar, doc, start) &&
      addConsultation(calendar, { doctor: doc, start, end });
  });
}
