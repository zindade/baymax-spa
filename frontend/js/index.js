import { render, getPath } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  render(getPath());

  window.addEventListener("hashchange", () => {
    render(getPath());
  });
});
