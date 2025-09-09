
export default function renderHome() {
  
  const homeContainer = document.createElement("div");
  homeContainer.className = "home-container";

  const searchSection = document.createElement("div");
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

  const btn = document.createElement("btn");
  btn.className = "search-btn";
  btn.textContent = '➤';

  searchBox.appendChild(input)
  searchBox.appendChild(btn);

  searchSection.appendChild(heading);
  searchSection.appendChild(paragraph);
  searchSection.appendChild(searchBox);

  homeContainer.appendChild(searchSection);

  return homeContainer;

}
/*<div class="home-container">
      <div class="search-section">
        <h1>Welcome to Baymax</h1>
        <p>How can I assist you today ? </p>

        <div class="search-box">
          <input 
            id="input" 
            class="search-bar" 
            type="text" 
            placeholder="Insert your text..." 
          />
          <button class="search-btn">➤</button>
        </div>

        <ul id="results" class="results-list"></ul>
      </div>
    </div>
  `; */