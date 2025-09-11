const baymaxUrl = "http://localhost:8080/baymax/api/ask-baymax";

async function handleBaymaxQuestion(question) {
  try {
    const response = await fetch(baymaxUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    
    const baymaxActualResponse = await response.json();
    const content = baymaxActualResponse.output?.content || "";

    console.log("Baymax says:", content);
    return content;
  } catch (error) {
    console.error("Error talking to Baymax:", error);
    return null;
  }
}

export {handleBaymaxQuestion};