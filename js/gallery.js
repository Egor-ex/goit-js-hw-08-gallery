import gallery from './gallery-items.js';

// Добавояем галерею в HTML
const galleryContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxRef = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('.lightbox__button');
const overlayModal = document.querySelector('.lightbox__overlay');



const galleryMarkup = galleryCreate(gallery);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup)

function galleryCreate(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `       
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </li>
        `;
    })
        .join('');
}

//console.log(galleryCreate(gallery))


//Делегирование на галерее и получение большого изображения

galleryContainer.addEventListener('click', onGalleryClick);

function onGalleryClick(evt) {
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }
}



//Открытие модального окна

galleryContainer.addEventListener('click', onOpenModal);

function onOpenModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    lightbox.classList.add('is-open');
    lightboxRef.src = event.target.dataset.source;
    lightboxRef.alt = event.target.alt;


}


//Закрытие модальношо окна разными методами

closeModalBtn.addEventListener('click', onCloseModal);

function onCloseModal(event) {
    lightbox.classList.remove('is-open');
    lightboxRef.src = '';
};


galleryContainer.addEventListener('keydown', CloseModalOnEsc);

function CloseModalOnEsc(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
};


overlayModal.addEventListener('click', closeModalOnOverlay);

function closeModalOnOverlay(event) {
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
};

