export default function renderMedications() {
  return `
    <div class="search-section">
      <h3>Medication Search</h3>
      <form id="searchForm">
        <div class="form-group">
          <input type="search" id="med" placeholder="Type a medication name...">
          <button type="submit">Search</button>
        </div>
      </form>
      <div id="result" class="result-box"></div>
    </div>
  `;
}
