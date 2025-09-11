import { handleBaymaxQuestion } from "/js/views/components/baymax-resp/handle-baymax-question.js";

export default function renderHome() {

  document.body.classList.remove('chat-view-active');
  // Flag para sabermos se o chat já começou
  let chatHasStarted = false;

  // --- 1. Criação dos Elementos (como você já tinha) ---
  const container = document.createElement('div');
  container.className = 'container mt-5 text-center';

  // Adicionamos a classe 'initial-view-item' aos elementos que devem desaparecer
  const logoContainer = document.createElement('div');
  logoContainer.className = 'baymax-logo-container initial-view-item';
  // ... (o resto do código do logo)
  const logo = document.createElement('div');
  logo.className = 'baymax-logo';
  logo.innerHTML = `<div class="dot"></div><div class="line"></div><div class="dot"></div>`;
  logoContainer.appendChild(logo);


  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'my-5 initial-view-item';
  // ... (o resto do código de boas-vindas)
  const h1 = document.createElement('h1');
  h1.className = 'welcome-title text-dark';
  h1.textContent = 'Welcome, I am Baymax';
  const pWelcome = document.createElement('p');
  pWelcome.className = 'welcome-subtitle text-muted';
  pWelcome.textContent = 'How can I assist you today?';
  welcomeDiv.appendChild(h1);
  welcomeDiv.appendChild(pWelcome);

  // A barra de pesquisa (input e botão)
  const queryContainer = document.createElement('div');
  queryContainer.className = 'health-query-container';
  const input = document.createElement('input');
  input.className = 'form-control health-query-input';
  input.placeholder = 'Type your health query...';
  input.id = 'healthQuery'; // Boa prática para acessibilidade
  input.name = 'health_query'; // Boa prática para formulários
  const btn = document.createElement('button');
  btn.className = 'btn health-query-btn';
  btn.type = 'button';
  btn.innerHTML = '<i class="bi bi-arrow-right"></i>';
  queryContainer.appendChild(input);
  queryContainer.appendChild(btn);

  // As sugestões, que também devem desaparecer
  const suggestionBox = document.createElement('div');
  suggestionBox.className = 'suggestion-box mt-4 background-color initial-view-item';
  // ... (o resto do código das sugestões)
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


  // --- 2. Lógica do Chat e Eventos ---

  // A nossa área de chat principal, que está no index.html
  const chatContentArea = document.getElementById("content");

  // Função auxiliar para mostrar mensagens no ecrã de forma limpa
  function displayMessage(htmlContent, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = htmlContent; // Usamos innerHTML para aceitar o HTML formatado
    chatContentArea.appendChild(messageDiv);
    // Faz scroll automático para a nova mensagem
    chatContentArea.scrollTop = chatContentArea.scrollHeight;
  }

  async function handleSubmitQuestion() {
    const question = input.value.trim();
    if (!question) return;

    // Se o chat já começou, apenas processa a mensagem
    if (chatHasStarted) {
      displayMessage(question, 'user');
      input.value = "";
      // ... (código para obter e mostrar a resposta do bot)
      const answer = await handleBaymaxQuestion(question);
      displayMessage(answer.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), 'bot');
      return;
    }

    // Se for a primeira pergunta, executa a sequência de animação
    if (!chatHasStarted) {
      chatHasStarted = true; // Marca que o processo começou para evitar duplos cliques
      
      const logoContainer = document.querySelector('.baymax-logo-container');
      
      // 1. Adiciona a classe para iniciar a animação do Baymax
      logoContainer.classList.add('animate-goodbye');

      // 2. "Ouve" o evento que avisa quando a animação terminou
      logoContainer.addEventListener('animationend', () => {
        
        // 3. SÓ DEPOIS da animação terminar, ativa o modo chat
        document.body.classList.add('chat-view-active');
        
        // Coloca o foco de volta no input para o utilizador poder escrever logo
        input.focus(); 

      }, { once: true }); // { once: true } faz com que este listener só dispare uma vez

      // Mostra a pergunta do utilizador e a resposta do bot (isto pode acontecer durante a animação)
      displayMessage(question, 'user');
      input.value = "";
      
      displayMessage("<i>Thinking...</i>", 'bot');
      const answer = await handleBaymaxQuestion(question);
      
      chatContentArea.removeChild(chatContentArea.lastChild); // Remove o "Thinking..."
      let formattedAnswer = answer
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      displayMessage(formattedAnswer, 'bot');
    }
  }

  // Adiciona os eventos ao botão e ao input (para a tecla Enter)
  btn.addEventListener("click", handleSubmitQuestion);
  input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      handleSubmitQuestion();
    }
  });
  

  // --- 3. Montagem Final da Página ---
  container.appendChild(logoContainer);
  container.appendChild(welcomeDiv);
  container.appendChild(queryContainer);
  container.appendChild(suggestionBox);

  // Retornamos o container inicial. A lógica do chat já está "ligada" aos elementos.
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
