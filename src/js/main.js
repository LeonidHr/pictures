import modals from "./modules/modal";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  modals('.button-design', '.popup-design', '.popup-design .popup-close');
  modals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  modals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

  sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn', '.feedback-slider');
  sliders('.main-slider-item', 'vertical');

  forms();
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
});
