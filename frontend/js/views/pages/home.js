import { handleBaymaxQuestion } from "/js/views/components/baymax-resp/handle-baymax-question.js";

export default function renderHome() {
  // 1. Criar o container principal
  const container = document.createElement('div');
  container.className = 'container mt-5 text-center';

  // 2. Criar a secção do logo
  const logoContainer = document.createElement('div');
  logoContainer.className = 'baymax-logo-container';
  const logo = document.createElement('div');
  logo.className = 'baymax-logo';
  logo.innerHTML = `<div class="dot"></div><div class="line"></div><div class="dot"></div>`;
  logoContainer.appendChild(logo);

  // 3. Criar a secção de boas-vindas
  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'my-5';
  const h1 = document.createElement('h1');
  h1.className = 'welcome-title text-dark';
  h1.textContent = 'Welcome, I am Baymax';
  const pWelcome = document.createElement('p');
  pWelcome.className = 'welcome-subtitle text-muted';
  pWelcome.textContent = 'How can I assist you today?';
  welcomeDiv.appendChild(h1);
  welcomeDiv.appendChild(pWelcome);

  // 4. Criar a secção da barra de pesquisa
  const queryContainer = document.createElement('div');
  queryContainer.className = 'health-query-container';
  const input = document.createElement('input');
  input.className = 'form-control health-query-input';
  input.placeholder = 'Type your health query...';
  const btn = document.createElement('button');
  btn.className = 'btn health-query-btn';
  btn.type = 'button';
  btn.innerHTML = '<i class="bi bi-arrow-right"></i>';
  queryContainer.appendChild(input);
  queryContainer.appendChild(btn);

  // 5. Criar a secção de sugestões
  const suggestionBox = document.createElement('div');
  suggestionBox.className = 'suggestion-box mt-4 background-color';
  const pSuggest = document.createElement('p');
  pSuggest.textContent = 'Maybe try asking:';
  const suggestionsDiv = document.createElement('div');
  const suggestions = [
    'Symptoms of common flu?',
    'How much water should I drink daily?',
    'What foods boost immunity?'
  ];
  suggestions.forEach(text => {
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'suggestion-pill';
    a.textContent = text;
    suggestionsDiv.appendChild(a);
  });
  suggestionBox.appendChild(pSuggest);
  suggestionBox.appendChild(suggestionsDiv);

  // 6. Juntar todas as secções ao container principal
  container.appendChild(logoContainer);
  container.appendChild(welcomeDiv);
  container.appendChild(queryContainer);
  container.appendChild(suggestionBox);

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const question = input.value;
    const answer = await handleBaymaxQuestion(question);

    if (!answer) {
    responseContainer.textContent = "No response from Baymax.";
    return;
  }

  // formata quebras de linha e bold
  let formatted = answer
    .replace(/\n/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  responseContainer.innerHTML = formatted;

  });

  // 7. Retornar o container completo como a página
  return container;
}
/*
export default function renderHome() {
  
  const homeContainer = document.createElement("div");
  homeContainer.className= "home-container mt-5 text-center";

  const searchSection = document.createElement("form");
  searchSection.className = "search-section";

  const heading = document.createElement("h1");
  heading.textContent = "Welcome to Baymax";

  const paragraph = document.createElement("p");
  paragraph.textContent = "How can I assist you today ?";

  const searchBox = document.createElement("div");
  searchBox.className = "search-box";

  const input = document.createElement("input");
  input.id = "input";
  input.className = "search-bar";
  input.type = "text";
  input.placeholder = "Insert your text...";

  const btn = document.createElement("button");
  btn.className = "search-btn";
  btn.type = "submit"
  btn.textContent = '➤';

  searchBox.appendChild(input)
  searchBox.appendChild(btn);

  searchSection.appendChild(heading);
  searchSection.appendChild(paragraph);
  searchSection.appendChild(searchBox);

  const responseContainer = document.createElement("p");
  responseContainer.id = "baymax-response";
  searchSection.appendChild(responseContainer);

  homeContainer.appendChild(searchSection);

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const question = input.value;
    const answer = await handleBaymaxQuestion(question);

    if (!answer) {
    responseContainer.textContent = "No response from Baymax.";
    return;
  }*/

  // formata quebras de linha e bold
  //let formatted = answer
   // .replace(/\n/g, "<br>")
   // .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

 // responseContainer.innerHTML = formatted;

  //});

 // return homeContainer;

//}
