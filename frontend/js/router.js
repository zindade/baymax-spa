import routes from "./routes.js";

function getPath() {
  return location.hash.slice(1) || "/"; 
}

export function render(path) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  const page = routes[path]; 
  if (page) {
    const pageElement = page();
    content.appendChild(pageElement);
  } else {
    content.innerHTML = "<h2>Page not found</h2>";
  }
}

export { getPath };
