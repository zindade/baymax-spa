import { renderSearchBar } from "/js/services/medication-search.js";
import { div } from "/js/views/components/commons/div.js";





export default function renderMedications() {
  const container = div(["medications-page"]);

 
  const searchBar = renderSearchBar();
  container.appendChild(searchBar);

  const active_ingredient = div([])
  active_ingredient.id = "num-act-ingredient";

  const resultsDiv = div(["results-section"]);
  resultsDiv.id = "results";

  container.appendChild(active_ingredient);
  container.appendChild(resultsDiv);

  
    return container;
}
