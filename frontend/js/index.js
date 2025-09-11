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
});

