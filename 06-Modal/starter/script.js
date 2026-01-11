'use strict';

const btns = document.querySelectorAll('button.show-modal');

const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');
const closeModalEl = document.querySelector('.close-modal');

function closeModal() {
  modalEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
}

btns.forEach((btn, index) => {
  btn.addEventListener('click', function () {
    modalEl.classList.remove('hidden');
    overlayEl.classList.remove('hidden');
  });
});

closeModalEl.addEventListener('click', closeModal);
overlayEl.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    closeModal();
  }
});
