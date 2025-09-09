export default function renderAboutUs() {

    const aboutUsContainer = document.createElement("div");
    aboutUsContainer.className = "aboutUs-container" 

    const heading = document.createElement("h1");
    heading.textContent = "About the Team";
    aboutUsContainer.appendChild(heading);

    const teamDiv = document.createElement("div");
    teamDiv.className = "team";

    const teamMembers = [
        {name : "Daniel", img: "../assets/teamPhotos/daniel.png"},
        {name: 'Mauro', img: '../assets/teamPhotos/mauro.png' },
        {name: 'Pedro',  img: '../assets/teamPhotos/pedro.png' },
        {name: 'Tiago', img: '../assets/teamPhotos/tiago.png' },
    ]

     // Create each member's figure
    teamMembers.forEach(member => {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = member.img;
    img.alt = `${member.name}`;
    figure.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = `${member.name}`;
    figure.appendChild(figcaption);

    teamDiv.appendChild(figure);
    });

    aboutUsContainer.appendChild(teamDiv);

    return aboutUsContainer;
}    

    /*

    <div class="learnmore-container">
      
      <h1>About the Team</h1>
      
      <div class="team">
        <img src="../assets/teamPhotos/daniel.png" alt="Daniel - Frontend Developer" />
        <img src="../assets/teamPhotos/mauro.png" alt="Mauro - Backend Developer" />
        <img src="../assets/teamPhotos/pedro.png" alt="Pedro - Backend Developer" />
        <img src="../assets/teamPhotos/tiago.png" alt="Tiago - Frontend Developer" />
      </div>

  `;
  */


