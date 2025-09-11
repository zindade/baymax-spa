
import { professionsMap } from "../../services/professions-service.js";
import { getHospitalsAndPharmaciesPortugal } from "../../services/map-services.js";
import { createLeafletMap } from "../components/map/leaflet-map.js";
import { addAmenitiesToMap } from "../components/map/amenities-layer.js";

export default function renderLearnMore() {
  const container = document.createElement("div");
  container.className = "container my-5";

 
  const heading = document.createElement("h1");
  heading.className = "text-center mb-4";
  heading.textContent = "Learn About Health Professionals";
  container.appendChild(heading);

  const description = document.createElement("p");
  description.className = "text-center text-muted mb-4";
  description.textContent =
    "Baymax can provide information about different healthcare professionals (PT/EN), powered by Wikipedia.";
  container.appendChild(description);

  const formDiv = document.createElement("div");
  formDiv.className = "input-group mb-4 w-50 mx-auto";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "form-control";
  input.placeholder = "Search professional...";

  const btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.textContent = "Search";

  formDiv.appendChild(input);
  formDiv.appendChild(btn);
  container.appendChild(formDiv);

  const listDiv = document.createElement("div");
  listDiv.className = "row g-4";
  container.appendChild(listDiv);

  async function fetchWikiInfo(topic) {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
      );
      if (!res.ok) throw new Error("Erro ao buscar dados da Wikipedia");
      return res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  btn.addEventListener("click", async () => {
    const query = input.value.trim().toLowerCase();
    if (!query) return;

    if (!professionsMap[query]) {
      listDiv.innerHTML = `<p class="text-danger">Só podes pesquisar profissões de saúde (PT/EN)</p>`;
      return;
    }

    listDiv.innerHTML = "";
    const wikiTerm = professionsMap[query];
    const data = await fetchWikiInfo(wikiTerm);

    if (data) {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";

      const card = document.createElement("div");
      card.className = "card h-100 shadow-sm";

      if (data.thumbnail?.source) {
        const img = document.createElement("img");
        img.src = data.thumbnail.source;
        img.alt = data.title;
        img.className = "card-img-top";
        card.appendChild(img);
      }

      const body = document.createElement("div");
      body.className = "card-body";

      const h3 = document.createElement("h5");
      h3.className = "card-title";
      h3.textContent = data.title;

      const p = document.createElement("p");
      p.className = "card-text";
      p.textContent = data.extract || "No description available.";

      body.appendChild(h3);
      body.appendChild(p);
      card.appendChild(body);
      col.appendChild(card);
      listDiv.appendChild(col);
    } else {
      listDiv.innerHTML = `<p class="text-danger">No results found</p>`;
    }
  });

  const mapTitle = document.createElement("h2");
  mapTitle.className = "text-center my-5";
  mapTitle.textContent = "Hospitals and Pharmacies in Portugal";
  container.appendChild(mapTitle);

  const { el: mapEl, ready } = createLeafletMap({
    height: 500,
  });
  container.appendChild(mapEl);

  (async () => {
    try {
      const map = await ready; 
      const data = await getHospitalsAndPharmaciesPortugal();
      addAmenitiesToMap(map, data.elements, { popupTitle: "Facility" });
    } catch (err) {
      console.error("Error:", err);
    }
  })();

  return container;
}
