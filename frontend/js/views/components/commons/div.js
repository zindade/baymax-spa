function div(classNames = []) {
  const div = document.createElement("div");

  classNames.forEach((className) => div.classList.add(className));

  return div;
}

export { div };
