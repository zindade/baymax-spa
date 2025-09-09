function element(tag, classNames = [], textContent = "") {
  const element = document.createElement(tag);

  classNames.forEach((className) => element.classList.add(className));

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
}

export { element };
