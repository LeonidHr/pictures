import modals from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  modals('.button-design', '.popup-design', '.popup-design .popup-close');
  modals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
});
