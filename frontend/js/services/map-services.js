

async function overpassGet(query) {
  const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Overpass : " + res.status);
  return res.json();
}

export async function getPharmaciesPortugal() {
  const query = `
    [out:json][timeout:25];
    area["ISO3166-1"="PT"][admin_level=2]->.pt;
    node["amenity"="pharmacy"](area.pt);
    out body;
  `;
  return overpassGet(query);
}

export async function getHospitalsAndPharmaciesPortugal() {
  const query = `
    [out:json][timeout:25];
    area["ISO3166-1"="PT"][admin_level=2]->.pt;
    (
      
      node["amenity"="pharmacy"](area.pt);
    );
    out body;
  `;
  return overpassGet(query);
}
