

export function createLeafletMap({ height = 500, center = [39.5, -8.0], zoom = 7 } = {}) {
 
  const el = document.createElement("div");
  el.style.height = `${height}px`;
  el.style.width = "100%";

  
  const ready = new Promise((resolve, reject) => {
 
    requestAnimationFrame(() => {
      try {
        const map = L.map(el).setView(center, zoom);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        resolve(map);
      } catch (e) {
        reject(e);
      }
    });
  });

  return { el, ready };
}
