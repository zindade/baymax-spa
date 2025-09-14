import { render, getPath } from "./router.js";
import { createNavbarDOM } from "./views/components/header.js"; // Corrigi o caminho, assumindo a estrutura

// Espera que o HTML esteja pronto antes de fazer qualquer coisa
document.addEventListener("DOMContentLoaded", () => {
  // 1. Primeiro, cria e insere a navbar
  createNavbarDOM();

  // 2. Depois, renderiza o conteúdo da página inicial
  render(getPath());

  // 3. Adiciona o listener para mudanças de hash (navegação da SPA)
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

