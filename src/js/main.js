import modals from "./modules/modal";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calcPrice from "./modules/calcPrice";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  let formState = {
    sum: 0
  };

  modals('.button-design', '.popup-design', '.popup-design .popup-close');
  modals('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  modals('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

  sliders('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn', '.feedback-slider');
  sliders('.main-slider-item', 'vertical');

  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
  showMoreStyles('.button-styles', '#styles .row');
  calcPrice('#size', '#material', '#options', '.promocode', '.calc-price', formState);
  forms(formState);
});
