import { handleBaymaxQuestion } from "/js/views/components/baymax-resp/handle-baymax-question.js";

export default function renderHome() {

  document.body.classList.remove('chat-view-active');
  
  let chatHasStarted = false;

  const container = document.createElement('div');
  container.className = 'container my-5 text-center card p-5 glass';
  container.id = 'chat-card'

  const chatDiv = document.createElement("div");
  chatDiv.id = "chat-container";
  chatDiv.className = "container text-center";
  
  const logoContainer = document.createElement('div');
  logoContainer.className = 'baymax-logo-container initial-view-item';
  
  const logo = document.createElement('div');
  logo.className = 'baymax-logo';
  logo.innerHTML = `<div class="dot"></div><div class="line"></div><div class="dot"></div>`;
  logoContainer.appendChild(logo);


  const welcomeDiv = document.createElement('div');
  welcomeDiv.className = 'my-5 initial-view-item';

  const h1 = document.createElement('h1');
  h1.className = 'welcome-title text-dark';
  h1.textContent = 'Welcome, I am Baymax';
  const pWelcome = document.createElement('p');
  pWelcome.className = 'welcome-subtitle text-muted';
  pWelcome.textContent = 'Your personal health assistant';
  welcomeDiv.appendChild(h1);
  welcomeDiv.appendChild(pWelcome);

  
  const queryContainer = document.createElement('div');
  queryContainer.className = 'health-query-container';
  const input = document.createElement('input');
  input.className = 'form-control health-query-input';
  input.placeholder = 'Ask baymax a question..';
  input.id = 'healthQuery'; 
  input.name = 'health_query'; 
  const btn = document.createElement('button');
  btn.className = 'btn health-query-btn';
  btn.type = 'button';
  btn.innerHTML = '<i class="bi bi-arrow-right"></i>';
  queryContainer.appendChild(input);
  queryContainer.appendChild(btn);

  
  const suggestionBox = document.createElement('div');
  suggestionBox.className = 'suggestion-box mt-4 background-color initial-view-item';
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
    a.addEventListener('click', (event) => {
        event.preventDefault();

        input.value = text;

        handleSubmitQuestion();
    });

    suggestionsDiv.appendChild(a);

  });
  suggestionBox.appendChild(pSuggest);
  suggestionBox.appendChild(suggestionsDiv);

  const chatContentArea = document.getElementById("content");


  function waitForCssEvent(element, eventName) {
    return new Promise(resolve => {
      element.addEventListener(eventName, resolve, { once: true });
    });
  }

  function displayMessage(htmlContent, sender, clear=false) {
    if (clear) {
      chatDiv.innerHTML = ""
    }
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = htmlContent; 
    chatDiv.appendChild(messageDiv);
    
    chatDiv.scrollTop = chatContentArea.scrollHeight;
  }

  async function handleSubmitQuestion() {
    const question = input.value.trim();
    if (!question) return;

    
    if (chatHasStarted) {
      displayMessage(question, 'user', true);
      input.value = "";
      displayMessage("<i>Thinking...</i>", 'bot');
      const answer = await handleBaymaxQuestion(question);
      chatDiv.removeChild(chatDiv.lastChild);
      displayMessage(answer.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), 'bot');
      return;
    }

    if (!chatHasStarted) {
      chatHasStarted = true; 
      
      const logoContainer = document.querySelector('.baymax-logo-container');
      const chatCard = document.getElementById("chat-card");

    
      logoContainer.classList.add('animate-goodbye');
      await waitForCssEvent(logo, 'animationend');
      chatCard.classList.add("push-bottom");
        
      document.body.classList.add('chat-view-active');
      input.placeholder = "Ask baymax another question.."
      await waitForCssEvent(queryContainer, 'transitionend');

      input.focus();
      displayMessage(question, 'user');
      input.value = "";
      
      displayMessage("<i>Thinking...</i>", 'bot');
      const answer = await handleBaymaxQuestion(question);
      
      chatDiv.removeChild(chatDiv.lastChild);
      let formattedAnswer = answer
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      displayMessage(formattedAnswer, 'bot');
    }
  }

  btn.addEventListener("click", handleSubmitQuestion);
  input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
      handleSubmitQuestion();
    }
  });
  

  
  container.appendChild(logoContainer);
  container.appendChild(welcomeDiv);
  container.appendChild(queryContainer);
  container.appendChild(suggestionBox);
  chatContentArea.appendChild(chatDiv);

  
  return container;
}
