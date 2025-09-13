import renderHome from "./views/pages/baymax.js";
import renderLearnMore from "./views/pages/learnMore.js";
import renderMedications from "./views/pages/medications.js";
import renderAboutUs from "./views/pages/aboutUs.js";
import renderSchedule from "./views/pages/schedule.js";


const routes = {
  "/": renderHome,
  "/medications": renderMedications,
  "/learnMore": renderLearnMore,
  "/aboutUs": renderAboutUs,
  "/schedule": renderSchedule,
};

export default routes;
