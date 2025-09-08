import renderHome from "./views/pages/home.js";
import renderLearnMore from "./views/pages/learnMore.js";
import renderMedications from "./views/pages/medications.js";



const routes = {
  "/": renderHome,
  "/medications": renderMedications,
  "/learnMore": renderLearnMore,
};

export default routes;
