import { render, getPath } from "./router.js";
import { createNavbarDOM } from "./views/components/header.js"; // Corrigi o caminho, assumindo a estrutura


document.addEventListener("DOMContentLoaded", () => {
  
  createNavbarDOM();

 
  render(getPath());

  
  window.addEventListener("hashchange", () => {
    render(getPath());
  });

  self.addEventListener('fetch', function (event) {
    if (event.request.url.includes('tile.openstreetmap.org')) {
      event.respondWith(
        caches.open('osm-tiles').then(function (cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function (networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
      );
    }
  });
});

