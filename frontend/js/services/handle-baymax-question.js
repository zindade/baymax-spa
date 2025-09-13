const baymaxUrl = "http://localhost:8080/baymax/api/ask-baymax";
const baymaxImageUrl = "http://localhost:8080/baymax/api/show-baymax"; // separate endpoint for image

async function handleBaymaxQuestion(question, imageBase64 = null) {
  try {
    const url = imageBase64 ? baymaxImageUrl : baymaxUrl;

    const payload = { question };
    if (imageBase64) payload.image = imageBase64.split(',')[1];

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const baymaxActualResponse = await response.json();
    const content = baymaxActualResponse.output?.content || "";

    return content;
  } catch (error) {
    console.error("Error talking to Baymax:", error);
    return null;
  }
}

export { handleBaymaxQuestion };
