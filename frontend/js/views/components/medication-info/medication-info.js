import { div } from "/js/views/components/commons/div.js";

export function renderMedicationInfo(data, ingredients, medName) {
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = `<p>${medName} contém ${ingredients.length} princípio(s) ativo(s): ${ingredients.join(", ")}</p>`;

  if (data.results) {
    data.results.forEach((drug, index) => {
      const card = document.createElement("div");
      card.className = "result-card";

      const disclaimer = data.meta.disclaimer? data.meta.disclaimer : "N/A";
      const doNotUse = drug.do_not_use ? drug.do_not_use.join(" ") : "N/A";
      const askDoctor = drug.ask_doctor ? drug.ask_doctor.join(" ") : "N/A";
      const whenUse = drug.when_using ? drug.when_using.join(" ") : "N/A";
      const stopUse = drug.stop_use ? drug.stop_use.join(" ") : "N/A";
      const route = drug.openfda && drug.openfda.route ? drug.openfda.route.join(" ") : "N/A";
      const purpose = drug.purpose ? drug.purpose.join(" ") : "N/A";
      const dosage = drug.dosage_and_administration ? drug.dosage_and_administration.join(" ") : "N/A";
      
      const askDoctorSplit = askDoctor.split("you");

      card.innerHTML = `
        
        <p><b>disclamer:</b> ${disclaimer}</p>
        <p><b>doNotUse:</b> ${doNotUse}</p>
        <p><b>askDoctor:</b> ${askDoctorSplit}</p>
        <p><b>whenUse:</b> ${whenUse}</p>
        <p><b>stopUse:</b> ${stopUse}</p>
        <p><b>route:</b> ${route}</p>
        <p><b>purpose:</b> ${purpose}</p>
        <p><b>dosage:</b> ${dosage}</p>
      `;

      resultsDiv.appendChild(card);
    });
  } else {
    resultsDiv.innerHTML += "<p>No results found</p>";
  }
}

export async function elementsSelecterJson(data) {
  let json = []

  if (data.results) {
    
    const drug = data.results[0]
      const disclaimer = data.meta.disclaimer? "Disclaimer: " + data.meta.disclaimer : "N/A";
      const doNotUse = drug.do_not_use ? "Do not use: " + drug.do_not_use.join(" ") : "N/A";
      const askDoctor = drug.ask_doctor ? "Ask doctor: " + drug.ask_doctor.join(" ") : "N/A";
      const whenUse = drug.when_using ? "When use: " + drug.when_using.join(" ") : "N/A";
      const stopUse = drug.stop_use ? "Stop use: " + drug.stop_use.join(" ") : "N/A";
      const route = drug.openfda && drug.openfda.route ? "Route: " + drug.openfda.route.join(" ") : "N/A";
      const purpose = drug.purpose ? "Purpose: " + drug.purpose.join(" ") : "N/A";
      const dosage = drug.dosage_and_administration ? "Dosage and administration: " + drug.dosage_and_administration.join(" ") : "N/A";
      
      json = [disclaimer, doNotUse, askDoctor, whenUse, stopUse, route, purpose, dosage];
    
  }else {
        console.log("No results found in elementsSelecterJson");
    }

  return json;
}