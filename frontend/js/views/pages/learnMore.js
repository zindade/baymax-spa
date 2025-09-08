export default function renderLearnMore() {
  return `
    <div class="learnmore-container">
      
      <h1>About the Baymax Project</h1>
      
      <div class="baymax-img">
        <img src="../assets/learnmore.png" alt="Learn More" />
      </div>

      <section class="learnmore-section">
        <h2>What is this project?</h2>
        <p>
          This is a final assignment for <strong>Code for All</strong>, where we created a
          Single Page Application (SPA) inspired by Baymax. The goal is to combine a 
          <strong>frontend SPA</strong> with a <strong>REST API backend</strong> that provides 
          medication data.
        </p>
      </section>

      <section class="learnmore-section">
        <h2>How does it work?</h2>
        <ol>
          <p1>Users can search for a medication in the search box.<br></p1>
          <p2>The request is sent to the backend (REST API). <br></p2>
          <p3>The backend responds with details (usage, side effects, warnings).<br></p3>
          <p4>The frontend shows the results in a friendly Baymax-like way.</p4>
        </ol>
      </section>

      <section class="learnmore-section">
        <h2>Why Baymax?</h2>
        <p>
          Baymax is a symbol of <strong>healthcare and empathy</strong>, making it a perfect 
          inspiration for a project that aims to simplify healthcare information 
          and make it more accessible to users.
        </p>
      </section>

    </div>
  `;
}
