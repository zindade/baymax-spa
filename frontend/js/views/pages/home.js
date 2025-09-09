

export default function renderHome() {
  return `

  <div class="home-container">
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
  `;
  
    /*
    <div class="main-container">
      <div class="search-container">
        <label for="input">Search medication name:</label>
        <input id="input" class="search-bar" type="text" placeholder="Insert medication name" />
        <ul id="results" class="results-list"></ul>
      </div><div class="baymax-img">
        <img src="../assets/baymax.png" alt="Baymax" />
      
    </div>
     
  `;*/
}
