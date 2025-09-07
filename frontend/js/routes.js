import renderHome from "./views/pages/home.js";
import renderMedications from "./views/pages/medications.js";

const routes = {
  "/": renderHome,
  "/medications": renderMedications,
};

export default routes;
