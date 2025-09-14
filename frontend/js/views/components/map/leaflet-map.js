export function createLeafletMap({ height = 500, center = [39.5, -8.0], zoom = 15 } = {}) {

  const redIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  const el = document.createElement("div");
  el.style.height = `${height}px`;
  el.style.width = "100%";

  const ready = new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      try {
        const map = L.map(el, {
          center: [39.5, -8.0],
          zoom: 7,
          zoomControl: false,   // no + / - buttons
          scrollWheelZoom: false, // disable mouse wheel zoom
          dragging: true          // still allow dragging
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Try to center on user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLatLng = [position.coords.latitude, position.coords.longitude];
              map.setView(userLatLng, zoom);

              // Add a marker at the user's location
              L.circleMarker(userLatLng, {
                radius: 10, // Adjust radius as needed
                color: 'red', // Sets the border color
                fillColor: 'red', // Sets the fill color
                fillOpacity: 0.7 // Adjust opacity as desired
              })
                .addTo(map);
            },
            (err) => {
              console.warn("Geolocation failed:", err);
            }
          );
        }

        resolve(map);
      } catch (e) {
        reject(e);
      }
    });
  });

  return { el, ready };
}

