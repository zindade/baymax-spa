import { renderSearchBar } from "/js/views/components/medication-info/medication-search.js";





export default function renderMedications() {
  const container = document.createElement("div");

  const search = renderSearchBar();

  container.appendChild(search)
    return container;
}
