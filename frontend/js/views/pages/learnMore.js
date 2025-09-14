import { getHospitalsAndPharmaciesPortugal } from "../../services/map-services.js";
import { createLeafletMap } from "../components/map/leaflet-map.js";
import { addAmenitiesToMap } from "../components/map/amenities-layer.js";

export default function renderLearnMore() {
  const container = document.createElement("div");
  container.className = "container my-5";

  const mapTitle = document.createElement("h2");
  mapTitle.className = "text-center my-5";
  mapTitle.textContent = "Hospitals and Pharmacies in Portugal";
  container.appendChild(mapTitle);

  const { el: mapEl, ready } = createLeafletMap({ height: 500 });
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
