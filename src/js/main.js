import modals from "./modules/modal";
import sliders from "./modules/sliders";
import forms from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  modals('.button-design', '.popup-design', '.popup-design .popup-close');
  modals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  modals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

  sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
  sliders('.main-slider-item', 'vertical');

  forms();
});
