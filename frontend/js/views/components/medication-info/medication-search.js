import { elementsSelecterJson } from"/js/views/components/medication-info/medication-info.js";
import {div} from "/js/views/components/commons/div.js";
import { element } from "/js/views/components/commons/element.js";

const baymaxUrl = "http://localhost:8080/baymax/api/medication/active-ingredient";

export function renderSearchBar(){

    const container = div(["container", "mt-5", "text-center", "card", "p-5"]);

    const title = element("h3", [], "Medication Search");
    container.appendChild(title);

    const search_form = element ("form", [], "");
    search_form.id = "seachForm";
    
    const form_content = div(["health-query-container"]);

    const input = document.createElement('input');
    input.className = 'form-control health-query-input';
    input.placeholder = 'Type a medication...';
    input.id = 'med'; 
    input.name = 'health_query'; 
    const btn = document.createElement('button');
    btn.className = 'btn health-query-btn';
    btn.type = 'submit';
    btn.innerHTML = '<i class="bi bi-arrow-right"></i>';

    form_content.appendChild(input);
    form_content.appendChild(btn);

    search_form.appendChild(form_content);
    container.appendChild(search_form);

    search_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const resultsDiv = document.getElementById("results"); 
    resultsDiv.innerHTML = '';

    const medName = document.getElementById("med").value;

    
    const response = await fetch(baymaxUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: medName })
    });

    const activeIngredient = await response.json();

    console.log(activeIngredient);

    for (const ingredient of activeIngredient){

      let card = await showActiveIngredient(ingredient);
        
        if (card) {
                resultsDiv.appendChild(card);
            }
    };

    container.appendChild(resultsDiv)
    
    
  });
    return container;
}

async function showActiveIngredient(ingredient){
  
  const fdaUrl = `https://api.fda.gov/drug/label.json?search=active_ingredient:${ingredient}&limit=1`;
  const fdaResponse = await fetch(fdaUrl);
  const fdaData = await fdaResponse.json();

   
  const selectedJson = await elementsSelecterJson(fdaData);

  const card = document.createElement('div');
  card.className = "container mt-5 text-center card p-5"

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

  card.innerHTML =`<p>Response of chat:  ` + marked.parse(chatResponse.output?.content || "");

  return card;
}