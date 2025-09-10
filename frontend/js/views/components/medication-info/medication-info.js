import { div } from "/js/views/components/commons/div.js";

export function renderMedicationInfo(data, ingredients, medName) {
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = `<p>${medName} contém ${ingredients.length} princípio(s) ativo(s): ${ingredients.join(", ")}</p>`;

  if (data.results) {
    data.results.forEach((drug, index) => {
      const card = document.createElement("div");
      card.className = "result-card";

      const brand = drug.openfda?.brand_name?.join(", ") || "N/A";
      const generic = drug.openfda?.generic_name?.join(", ") || "N/A";
      const purpose = drug.purpose ? drug.purpose.join(" ") : "N/A";
      const dosage = drug.dosage_and_administration ? drug.dosage_and_administration.join(" ") : "N/A";
      const warnings = drug.warnings ? drug.warnings.join(" ") : "N/A";

      card.innerHTML = `
        <h4>${brand}</h4>
        <p><b>Generic name:</b> ${generic}</p>
        <p><b>Purpose:</b> ${purpose}</p>
        <p><b>Dosage:</b> ${dosage}</p>
        <p><b>Warnings:</b> ${warnings}</p>
      `;

      resultsDiv.appendChild(card);
    });
  } else {
    resultsDiv.innerHTML += "<p>No results found</p>";
  }
}