export default function renderLearnMore() {
  const container = document.createElement("div");
  container.className = "learnMore-container";

  const heading = document.createElement("h1");
  heading.textContent = "Learn About Health Professionals";
  container.appendChild(heading);

  const description = document.createElement("p");
  description.textContent = "Baymax can provide you with information about different healthcare professionals, powered by Wikipedia.";
  container.appendChild(description);


  const professionals = ["Doctor", "Pharmacist", "Nurse", "Therapist"];

  const listDiv = document.createElement("div");
  listDiv.className = "professional-list";
  container.appendChild(listDiv);

 
  async function fetchWikiInfo(topic) {
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da Wikipedia");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

 
  professionals.forEach(async (prof) => {
    const data = await fetchWikiInfo(prof);

    const card = document.createElement("div");
    card.className = "professional-card";

    if (data) {
      const h3 = document.createElement("h3");
      h3.textContent = data.title;

      const p = document.createElement("p");
      p.textContent = data.extract || "No description available.";

      card.appendChild(h3);
      card.appendChild(p);

      if (data.thumbnail && data.thumbnail.source) {
        const img = document.createElement("img");
        img.src = data.thumbnail.source;
        img.alt = data.title;
        img.style.width = "100px";
        card.appendChild(img);
      }
    } else {
      card.textContent = `Could not load info about ${prof}`;
    }

    listDiv.appendChild(card);
  });

  return container;
}
