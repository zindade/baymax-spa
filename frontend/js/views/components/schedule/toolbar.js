
export function buildScheduleToolbar({ onSeed, onClear, onNew }) {
  const bar = document.createElement("div");
  bar.className = "d-flex gap-2 mb-3";

  const btnNew = document.createElement("button");
  btnNew.className = "btn btn-primary";
  btnNew.textContent = "new event";
  btnNew.addEventListener("click", () => onNew && onNew());
  bar.appendChild(btnNew);

  //const btnSeed = document.createElement("button");
  //btnSeed.className = "btn btn-outline-primary";
  //btnSeed.textContent = "i want 4 doctor's appointment next week";
  //btnSeed.addEventListener("click", () => onSeed && onSeed());
  //bar.appendChild(btnSeed);

  const btnClear = document.createElement("button");
  btnClear.className = "btn btn-outline-danger";
  btnClear.textContent = "delete all";
  btnClear.addEventListener("click", () => onClear && onClear());
  bar.appendChild(btnClear);

  return bar;
}
