import { renderSearchBar } from "/js/views/components/medication-info/medication-search.js";
import { div } from "/js/views/components/commons/div.js";





export default function renderMedications() {
  const container = div(["medications-page"]);

  // barra de pesquisa
  const searchBar = renderSearchBar();
  container.appendChild(searchBar);

  // div para resultados (fica por baixo da barra)
  const resultsDiv = div(["results-section"]);
  resultsDiv.id = "results";
  container.appendChild(resultsDiv);

  
    return container;
}
