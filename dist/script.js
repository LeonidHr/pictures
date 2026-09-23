/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/modal.js"
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modalTimerId = setTimeout(() => openModal('.popup-consultation'), 60000);
let btnPressed;
openModalByScroll('.fixed-gift');
const modals = (triggerSelector, modalSelector, closeSelector, destroy = false) => {
  const trigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector),
    close = document.querySelector(closeSelector);
  trigger.forEach(item => {
    item.addEventListener("click", e => {
      if (e.target) {
        e.preventDefault();
        openModal(modalSelector);
        btnPressed = true;
        if (destroy) {
          item.remove();
        }
      }
    });
  });
  close.addEventListener("click", () => closeAllModals());
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      closeAllModals();
    }
  });
};
function openModal(modalSelector) {
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  closeAllModals();
  document.querySelector(modalSelector).classList.add('show', 'animated', 'fadeIn');
  document.body.classList.add('modal-open');
  document.body.style.marginRight = `${scrollWidth}px`;
  clearTimeout(modalTimerId);
}
function openModalByScroll(selector) {
  window.addEventListener("scroll", () => {
    if (!btnPressed && window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      document.querySelector(selector).click();
    }
  });
}
function closeModal(modalSelector) {
  document.body.style.marginRight = '0px';
  document.querySelector(modalSelector).classList.remove('show', 'animated', 'fadeIn');
  document.body.classList.remove('modal-open');
}
function closeAllModals() {
  const modalsArr = document.querySelectorAll('[data-modal]');
  modalsArr.forEach(item => {
    closeModal(`.${item.dataset.modal}`);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ },

/***/ "./src/js/modules/sliders.js"
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sliders = (slide, dir, prev, next) => {
  const slidesArr = document.querySelectorAll(slide);
  let slideIndex = 1,
    isAnimating = false,
    intervalId;
  initSlides(slideIndex);
  setAnimation();
  function initSlides(n) {
    let height = 0;
    slidesArr.forEach(slide => {
      height = Math.max(height, slide.offsetHeight);
      slide.classList.add('animated');
      slide.style.display = 'none';
      slide.style.position = 'absolute';
    });
    slidesArr[0].parentNode.style.minHeight = height + 'px';
    slidesArr[n - 1].style.display = 'block';
  }
  function makeBigFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  function showSlides(from, to) {
    if (isAnimating) return;
    isAnimating = true;
    const currentSlide = slidesArr[slideIndex - 1];
    if (from === 'right' || from === 'up') {
      slideIndex++;
      if (slideIndex > slidesArr.length) {
        slideIndex = 1;
      }
    }
    if (from === 'left' || from === 'down') {
      slideIndex--;
      if (slideIndex < 1) {
        slideIndex = slidesArr.length;
      }
    }
    const nextSlide = slidesArr[slideIndex - 1];
    nextSlide.classList.remove(`slideOut${makeBigFirstLetter(from)}`, `slideOut${makeBigFirstLetter(to)}`, `slideIn${makeBigFirstLetter(to)}`);
    currentSlide.classList.add(`slideOut${makeBigFirstLetter(to)}`);
    nextSlide.classList.add(`slideIn${makeBigFirstLetter(from)}`);
    nextSlide.style.display = 'block';
    currentSlide.addEventListener('animationend', () => isAnimating = false, {
      once: true
    });
  }
  try {
    const prevBtn = document.querySelector(prev),
      nextBtn = document.querySelector(next);
    prevBtn.addEventListener("click", () => {
      showSlides('left', 'right');
    });
    nextBtn.addEventListener("click", () => {
      showSlides('right', 'left');
    });
  } catch (e) {}
  function setAnimation() {
    if (dir === 'vertical') {
      intervalId = setInterval(() => {
        showSlides('up', 'up');
      }, 3000);
    } else {
      intervalId = setInterval(() => {
        showSlides('right', 'left');
      }, 3000);
    }
  }
  slidesArr[0].parentNode.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });
  slidesArr[0].parentNode.addEventListener("mouseleave", () => {
    setAnimation();
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");


window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.button-design', '.popup-design', '.popup-design .popup-close');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_0__["default"])('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.feedback-slider-item', '', '.main-prev-btn', '.main-next-btn');
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_1__["default"])('.main-slider-item', 'vertical');
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map