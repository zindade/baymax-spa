

import { div } from "/js/views/components/commons/div.js";

export function renderMedicationInfo(data) {
  let resultsDiv = document.getElementById("results");
  if (!resultsDiv) {
    resultsDiv = div(["result-box"]);
    resultsDiv.id = "results";
    document.querySelector(".search-section").appendChild(resultsDiv);
  }

  resultsDiv.innerHTML = "";

  if (data.results) {
    data.results.forEach((drug, index) => {
      const list = document.createElement("ul");
      list.innerHTML = `<h4>Resultado ${index + 1}</h4>`;
      
      for (const key in drug) {
        let value = drug[key];
        if (Array.isArray(value)) {
          value = value.join(", ");
        } else if (typeof value === "object" && value !== null) {
          value = JSON.stringify(value, null, 2);
        }
        const li = document.createElement("li");
        li.innerHTML = `<b>${key}:</b> ${value}`;
        list.appendChild(li);
      }

      resultsDiv.appendChild(list);
    });
  } else {
    resultsDiv.innerHTML = "<p>No results found</p>";
  }
}