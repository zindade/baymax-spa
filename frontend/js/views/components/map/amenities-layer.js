export function addAmenitiesToMap(map, elements, { popupTitle = "Local" } = {}) {
  const group = L.layerGroup();
  const bounds = [];

  const now = new Date();

  (elements || []).forEach(el => {
    if (el.lat && el.lon) {
      const name = el.tags?.name || "Sem nome";
      const type = el.tags?.amenity || "amenity";

      let popupContent = `<b>${name}</b><br/>${type}`;

      if (el.tags?.opening_hours) {
        popupContent += `<br/><small>Hours: ${el.tags.opening_hours}</small>`;
      }

      const marker = L.marker([el.lat, el.lon]).bindPopup(popupContent);
      marker.addTo(group);
      bounds.push([el.lat, el.lon]);
    }
  });

  group.addTo(map);
  return group;
}
