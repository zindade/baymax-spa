export default function renderAboutUs() {
  const team = [
    { name: "Daniel", role: "Software Engineer", blurb: "2025 class06 codeforall_ alumni", img: "../assets/teamPhotos/daniel.png" },
    { name: "Mauro", role: "Software Engineer", blurb: "2025 class06 codeforall_ alumni", img: "../assets/teamPhotos/mauro.png" },
    { name: "Pedro", role: "Software Engineer", blurb: "2025 class06 codeforall_ alumni", img: "../assets/teamPhotos/pedro.png" },
    { name: "Tiago", role: "Software Engineer", blurb: "2025 class06 codeforall_ alumni", img: "../assets/teamPhotos/tiago.png" },
  ];

  // helperzinho para reduzir verbosidade
  const el = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  };

  const wrap = el("div", "container aboutus-bg");

  const headingWrap = el("div", "text-center mb-5");
  const h2 = el("h2", "display-6 fw-bold mb-2");
  h2.innerHTML = "Meet the Baymax Team";
  headingWrap.appendChild(h2);
  wrap.appendChild(headingWrap);

  const row = el("div", "row g-4 justify-content-center");

  team.forEach(m => {
    const col = el("div", "col-12 col-sm-6 col-lg-5");
    const card = el("div", "card team-card text-center shadow-sm border-0 rounded-4 p-4 glass");

    const ring = el("div", "mx-auto avatar-ring mb-3");
    const img = el("img", "avatar");
    img.src = m.img;
    img.alt = m.name;
    ring.appendChild(img);

    const name = el("h5", "mb-0 fw-semibold", m.name);
    const role = el("div", "text-body-secondary small", m.role);
    const blurb = el("div", "text-secondary small mt-1", m.blurb);

    card.append(ring, name, role, blurb);
    col.appendChild(card);
    row.appendChild(col);
  });

  wrap.appendChild(row);
  return wrap;
}
