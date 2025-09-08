

export default function renderHome() {
  return `
    <div class="main-container">
      <div class="search-container">
        <label for="input">Search medication name:</label>
        <input id="input" class="search-bar" type="text" placeholder="Insert medication name" />
        <ul id="results" class="results-list"></ul>
      </div><div class="baymax-img">
        <img src="../assets/baymax.png" alt="Baymax" />
      
    </div>
     
  `;
}
