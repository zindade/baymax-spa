
function button(text, onClick, additionalClass = "") {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = ["btn", additionalClass].filter(Boolean).join(" ");
  btn.addEventListener("click", onClick);
  return btn;
}

export {button};