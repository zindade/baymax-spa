
export function buildScheduleToolbar({ onSeed, onClear, onNew }) {
  const bar = document.createElement("div");
  bar.className = "d-flex gap-2 mb-3";

  const btnNew = document.createElement("button");
  btnNew.className = "btn btn-primary";
  btnNew.textContent = "Novo evento";
  btnNew.addEventListener("click", () => onNew && onNew());
  bar.appendChild(btnNew);

  const btnSeed = document.createElement("button");
  btnSeed.className = "btn btn-outline-primary";
  btnSeed.textContent = "Marcar 1 consulta por médico (próx. semana)";
  btnSeed.addEventListener("click", () => onSeed && onSeed());
  bar.appendChild(btnSeed);

  const btnClear = document.createElement("button");
  btnClear.className = "btn btn-outline-danger";
  btnClear.textContent = "Apagar todos";
  btnClear.addEventListener("click", () => onClear && onClear());
  bar.appendChild(btnClear);

  return bar;
}
