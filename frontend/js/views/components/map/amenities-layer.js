
export function addAmenitiesToMap(map, elements, { popupTitle = "Local" } = {}) {
  const group = L.layerGroup();
  const bounds = [];

  (elements || []).forEach(el => {
    if (el.lat && el.lon) {
      const name = el.tags?.name || "Sem nome";
      const type = el.tags?.amenity || "amenity";
      const marker = L.marker([el.lat, el.lon]).bindPopup(`<b>${name}</b><br/>${type}`);
      marker.addTo(group);
      bounds.push([el.lat, el.lon]);
    }
  });

  group.addTo(map);
  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30] });
  return group;
}
