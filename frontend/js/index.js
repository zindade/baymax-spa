import { render, getPath } from "./router.js";
import button from "./views/components/commons/button.js";


document.addEventListener("DOMContentLoaded", () => {
  render(getPath());
  

  window.addEventListener("hashchange", () => {
    render(getPath());
  });
});


