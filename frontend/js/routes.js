import renderHome from "./views/pages/home.js";
import renderLearnMore from "./views/pages/learnMore.js";
import renderMedications from "./views/pages/medications.js";
import renderAboutUs from "./views/pages/aboutUs.js";


const routes = {
  "/": renderHome,
  "/medications": renderMedications,
  "/learnMore": renderLearnMore,
  "/aboutUs": renderAboutUs,
};

export default routes;
