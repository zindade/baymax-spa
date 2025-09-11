import { render, getPath } from "./router.js";

export default function initApp() {
 
  render(getPath());

 
  window.addEventListener("hashchange", () => {
    render(getPath());
  });
}
