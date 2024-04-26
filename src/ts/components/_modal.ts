const modal = document.querySelector('.modal') as HTMLDivElement;
const modalOverlay = document.querySelector('.modal__overlay') as HTMLDivElement;
const modalButton = document.querySelector('.modal-button') as HTMLButtonElement;
const modalContent = document.querySelector('.modal__content') as HTMLDivElement;


function showModal(modal:HTMLDivElement) {
    modal.classList.remove('modal--hidden')
    modalOverlay.classList.remove('modal__overlay--hidden')
}

function closeModal(modal:HTMLDivElement) {
    modal.classList.add('modal--hidden')
    modalOverlay.classList.add('modal__overlay--hidden')
}

// open modal window
modalButton.addEventListener("click", function () {
    showModal(modalContent)
})

// close modal window with click on close button or outside of the modal
modal.addEventListener("click", function (e) {
    const target = e.target as HTMLElement
    if (target.classList.contains('modal__close')) closeModal(modalContent)
    else if (target.classList.contains('modal__overlay')) closeModal(modalContent)
})

// close modal window with keyboard (Escape key)
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalContent.classList.contains('hidden')) {
        closeModal(modalContent);
    }
});
