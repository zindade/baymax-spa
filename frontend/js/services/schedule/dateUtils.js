
export function startOfWeek(d) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; 
  date.setHours(0,0,0,0);
  date.setDate(date.getDate() - day);
  return date;
}
export function endOfWeek(d) {
  const s = startOfWeek(d);
  const e = new Date(s);
  e.setDate(s.getDate() + 7);
  return e;
}
