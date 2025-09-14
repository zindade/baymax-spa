import renderHome from "./views/pages/home.js";
import renderLearnMore from "./views/pages/learnMore.js";
import renderMedications from "./views/pages/medications.js";
import renderAboutUs from "./views/pages/aboutUs.js";
import renderSchedule from "./views/pages/schedule.js";
import renderWikiProfessions from "./views/pages/wikiProfessions.js";

const routes = {
  "/": renderHome,
  "/medications": renderMedications,
  "/learnMore": renderLearnMore,
   "/wikiProfessions": renderWikiProfessions, 
  "/aboutUs": renderAboutUs,
  "/schedule": renderSchedule,
};

export default routes;
