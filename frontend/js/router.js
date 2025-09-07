import routes from "./routes.js";

function getPath() {
  return location.hash.slice(1) || "/"; 
}

export function render(path) {
  const content = document.getElementById("content");

  const page = routes[path]; 
  if (page) {
    content.innerHTML = page();
  } else {
    content.innerHTML = "<h2>Page not found</h2>";
  }
}

export { getPath };
