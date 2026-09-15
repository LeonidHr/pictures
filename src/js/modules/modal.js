
const modals = (
  triggerSelector, 
  modalSelector, 
  closeSelector, 
  isCloseByOverlay = true
) => {
  const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector);

  trigger.forEach(item => {
    item.addEventListener("click", e => {
      if (e.target) {
        e.preventDefault();
        openModal(modalSelector);
      }
    });
  });

  close.addEventListener("click", () => closeAllModals());

  modal.addEventListener("click", e => {
    if (e.target === modal && isCloseByOverlay) {
      closeAllModals();
    }
  });
}

const modalTimerId = setTimeout(() => openModal('.popup-consultation'), 60000);

function openModal(modalSelector) {
  const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
  closeAllModals();

  document.querySelector(modalSelector).classList.add('show', 'animated_4ms', 'fadeIn');
  document.body.classList.add('modal-open');
  document.body.style.marginRight = `${scrollWidth}px`;

  clearTimeout(modalTimerId);
}

function closeModal(modalSelector) {
  document.body.style.marginRight = '0px';
  document.querySelector(modalSelector).classList.remove('show', 'animated_4ms', 'fadeIn');
  document.body.classList.remove('modal-open');
}

function closeAllModals() {
  const modalsArr = document.querySelectorAll('[data-modal]');

  modalsArr.forEach(item => {
    closeModal(`.${item.dataset.modal}`);
  });
}

export default modals;