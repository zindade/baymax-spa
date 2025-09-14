import { elementsSelecterJson } from "/js/views/components/medication-info/medication-info.js";
import { div } from "/js/views/components/commons/div.js";
import { element } from "/js/views/components/commons/element.js";
import { loaderSvg } from "/js/views/components/svg.js";

const baymaxUrl = "https://salab3rt.ddns.net:8443/baymax/api/medication/active-ingredient";

export function renderSearchBar() {

  const container = div(["container", "mt-2", "text-center", "card", "p-3"]);
  container.id = "search-container";

  const title = element("h3", [], "Medication Search");
  container.appendChild(title);

  const search_form = element("form", [], "");
  search_form.id = "seachForm";

  const form_content = div(["health-query-container"]);
  document.body.classList.remove('chat-view-active');

  const input = document.createElement('input');
  input.className = 'form-control health-query-input';
  input.placeholder = 'Type a medication...';
  input.id = 'med';
  input.name = 'health_query';
  const btn = document.createElement('button');
  btn.className = 'btn health-query-btn';
  btn.type = 'submit';
  btn.innerHTML = '<i class="bi bi-arrow-right"></i>';

  const loader = document.createElement("div");
  loader.style.display = "none"
  loader.style.position = "absolute"
  loader.innerHTML = loaderSvg

  btn.appendChild(loader);

  form_content.appendChild(input);
  form_content.appendChild(btn);

  search_form.appendChild(form_content);
  container.appendChild(search_form);

  search_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    loader.style.display = "inline"
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = '';

    const titleIngredientsContainer = document.getElementById("num-act-ingredient");
    titleIngredientsContainer.innerHTML = '';

    const medName = document.getElementById("med").value;


    const response = await fetch(baymaxUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: medName })
    });

    const activeIngredient = await response.json();

    console.log(activeIngredient);

    for (const ingredient of activeIngredient) {

      let card = await showActiveIngredient(ingredient);

      if (card) {
        resultsDiv.appendChild(card);
      }
    };

    let titleCard = activeIngredients(activeIngredient);

    titleIngredientsContainer.appendChild(titleCard);
    loader.style.display = "none";
  });

  return container;
}

function activeIngredients(activeIngredients) {

  const ingredientsDiv = document.createElement("div");
  ingredientsDiv.className = "container mt-3 text-center card p-2";
  ingredientsDiv.id = "card-ingredients-title";
  const title = document.createElement("p");

  title.textContent = `This medication contains ${activeIngredients.length} active ingredient(s):`;
  title.style.fontWeight = 'bold';

  const ingredientsList = document.createElement("p");

  ingredientsList.textContent = activeIngredients.join(', ');

  ingredientsDiv.appendChild(title);
  ingredientsDiv.appendChild(ingredientsList);

  return ingredientsDiv;
}

async function showActiveIngredient(ingredient) {

  const fdaUrl = `https://api.fda.gov/drug/label.json?search=active_ingredient:${ingredient}&limit=1`;
  const fdaResponse = await fetch(fdaUrl);
  const fdaData = await fdaResponse.json();

  const selectedJson = await elementsSelecterJson(fdaData);

  const card = document.createElement('div');
  card.className = "container mt-3 text-start card p-5"
  card.id = "card-ingredients"
  if (selectedJson.length === 0) {
    card.innerHTML = `<p>No FDA information found for ingredient: ${ingredient}</p>`;
    return card;
  }

  const response2 = await fetch(baymaxUrl + "/" + ingredient.toLowerCase(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: JSON.stringify(selectedJson) })
  })

  const chatResponse = await response2.json();
  card.innerHTML = marked.parse(chatResponse.output?.content || "");

  return card;
}