import { renderMedicationInfo } from "/js/views/components/medication-info/medication-info.js";
import {div} from "/js/views/components/commons/div.js";
import { element } from "/js/views/components/commons/element.js";
import {input} from "/js/views/components/commons/input.js"

const baymaxUrl = "http://localhost:8080/baymax/api/medication/active-ingredient";

export function renderSearchBar(){

    const container = div(["search-section"]);

    const title = element("h3", [], "Medication Search");
    container.appendChild(title);

    const search_form = element ("form", [], "");
    search_form.id = "seachForm";
    
    const form_content = div(["form-group"]);

    const searchInput = input("text", "med", "Type a medication name...");
    const btn = document.createElement("button");
    btn.type = "submit";
    btn.textContent = "Search";

    form_content.appendChild(searchInput);
    form_content.appendChild(btn);

    search_form.appendChild(form_content);
    container.appendChild(search_form);

    search_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const medName = document.getElementById("med").value;

    
    const response = await fetch(baymaxUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: medName })
    });

    const activeIngredient = await response.text();

    
    const fdaUrl = `https://api.fda.gov/drug/label.json?search=active_ingredient:${activeIngredient}&limit=5`;
    const fdaResponse = await fetch(fdaUrl);
    const fdaData = await fdaResponse.json();

    renderMedicationInfo(fdaData);
  });

    return container;
}