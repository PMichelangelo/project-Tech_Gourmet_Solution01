import { getServerProductsById } from './fetchProducts.js';
import * as basicLightbox from 'basiclightbox';
import icons from '../img/icons.svg';
import { addToCart, removeFromCart, updateCardState } from './cartStorage';
import imageModalEmailMob from '../img/modal-email-mob.png';
import imageModalEmailMob2x from '../img/modal-email-mob-2x.png';
import imageModalEmailTab from '../img/modal-email-tab.png';
import imageModalEmailTab2x from '../img/modal-email-tab-2x.png';
import imageModalEmailDesk from '../img/modal-email-desk.png';
import imageModalEmailDesk2x from '../img/modal-email-desk-2x.png';
import cardPageModalImg from '../img/cardPageModalImg.png';

function checkIfProductInCart(productId) {
  const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
  return cartData.includes(productId);
}

let modalOpened = false;

async function openModal(productId) {
  try {
    const productData = await getServerProductsById(productId);

    const modalContent = document.createElement('div');

    modalContent.innerHTML = `<div class="modal-container" data-id="${
      productData._id
    }">
    <div class="modal-img-info-container">
        <div class="modal-img-container">
            <img class="modal-img" src="${productData.img}" alt="${
      productData.name
    }" loading="lazy" />
        </div>
        <div class="modal-name-container">
            <h3 class="modal-name">${productData.name}</h3>
            <div class="modal-info-container">
                <p class="modal-info">Category: <span class="modal-span-info">${productData.category
                  .replace('_', ' ')
                  .replace('_', ' ')}</span></p>
                <p class="modal-info">Size: <span class="modal-span-info">${productData.size.replace(
                  'oz',
                  'g'
                )}</span></p>
                <p class="modal-info">Popularity: <span class="modal-span-info">${
                  productData.popularity
                }</span></p>
            </div>
            <p class="modal-desc">${productData.desc}</p>
        </div>
    </div>
    <div class="modal-price-container">
        <p class="modal-price">$${productData.price}</p>
        <button type="button" class="modal-button js-btn" title='add item' aria-label="add item">
            <span class="modal-button-text">Add to</span>
            <svg class="modal-button-icon" width="18" height="18">
                <use href="${icons}#icon-shoping-cart"></use>
            </svg>
        </button>
        <button class='close-modal'> <svg class="close-modal-icon" width="10" height="10">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
    </div>
</div>`;

    const instance = basicLightbox.create(modalContent);
    if (!modalOpened) {
      instance.show();
      addoOverflow();
      modalOpened = true;
    }

    function outsideClickListener(event) {
      const modalContainer = document.querySelector('.modal-container');
      if (!modalContainer.contains(event.target)) {
        closeModal();
      }
    }

    function closeModal() {
      instance.close();
      removeOverflow();
      document.removeEventListener('click', outsideClickListener);
      closeBtn.removeEventListener('click', closeModal);
      modalOpened = false;
    }

    function closeModalEsp(event) {
      if (event.key === 'Escape') {
        instance.close();
        removeOverflow();
        document.removeEventListener('keydown', closeModalEsp);
      }
    }

    document.addEventListener('click', outsideClickListener);
    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-modal-icon');
    closeBtn.addEventListener('click', closeModal);

    const addToCartBtn = document.querySelector('.modal-button');
    addToCartBtn.addEventListener('click', event => {
      const card = event.target.closest('.modal-container');
      const btn = event.target.closest('.modal-button');
      if (card && btn) {
        const productId = card.getAttribute('data-id');
        modalOpened = false;
        const buttonTextSpan = btn.querySelector('.modal-button-text');
        const isProductInCart = checkIfProductInCart(productData._id);
        if (isProductInCart) {
          buttonTextSpan.textContent = 'Remove from';
        }
        if (buttonTextSpan.textContent === 'Add to') {
          addToCart(productId);
          buttonTextSpan.textContent = 'Remove from';
          btn.classList.add('added-to-cart');
        } else if (buttonTextSpan.textContent === 'Remove from') {
          removeFromCart(productId);
          buttonTextSpan.textContent = 'Add to';
          btn.classList.remove('added-to-cart');
        }

        updateCardState(productId);
      }
    });
    const isProductInCart = checkIfProductInCart(productData._id);
    const buttonTextSpan = addToCartBtn.querySelector('.modal-button-text');
    if (isProductInCart) {
      buttonTextSpan.textContent = 'Remove from';
      addToCartBtn.classList.add('added-to-cart');
    } else {
      buttonTextSpan.textContent = 'Add to';
      addToCartBtn.classList.remove('added-to-cart');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}

function openSubcribeModal() {
  try {
    const instance = basicLightbox.create(`<div class="footer-modal">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10" title='close' aria-label="close">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content'><h3 class='footer-modal-title'>Thanks for subscribing for <span class='span'>new</span> products</h3>
        <p class='footer-modal-text'>We promise you organic and high-quality products that will meet your expectations. Please stay with us and we promise you many pleasant surprises.</p>
        <picture class='footer-modal-img'>
      <source
        srcset="
          ${imageModalEmailMob}     1x,
          ${imageModalEmailMob2x}  2x
        "
        media="(min-width: 375px) and (max-width: 767px)"
      />
      <source
        srcset="
          ${imageModalEmailTab}     1x,
          ${imageModalEmailTab2x}  2x
        "
        media="(min-width: 768px) and (max-width: 1439px)"
      />
      <source
        srcset="
          ${imageModalEmailDesk}    1x,
          ${imageModalEmailDesk2x}  2x
        "
        media="(min-width: 1440px)"
      />
      <img src="${imageModalEmailMob}" alt="vegetables" />
    </picture>
    </div>`);

    instance.show();
    addoOverflow();

    function closeModalEsp(event) {
      if (event.key === 'Escape') {
        instance.close();
        removeOverflow();
        document.removeEventListener('keydown', closeModalEsp);
      }
    }

    function closeModal() {
      instance.close();
      removeOverflow();
      document.removeEventListener('click', outsideClickListener);

      closeBtn.removeEventListener('click', closeModal);
    }

    function outsideClickListener(event) {
      const footerModal = document.querySelector('.footer-modal');
      if (!footerModal.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-footer-modal');
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('click', outsideClickListener);
  } catch (error) {
    console.error(error);
  }
}
function openErrorModal() {
  try {
    const instance = basicLightbox.create(`<div class="footer-modal-err">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10" title='close' aria-label="close">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content-err'><h3 class='footer-modal-err-title'>This <span>email address</span> has already been entered</h3>
        <p class='footer-modal-err-text'>You have already subscribed to our new products. Watch for offers at the mailing address.</p>
    </div>`);
    instance.show();
    addoOverflow();
    function closeModalEsp(event) {
      if (event.key === 'Escape') {
        instance.close();
        removeOverflow();
        document.removeEventListener('keydown', closeModalEsp);
      }
    }

    function closeModal() {
      instance.close();
      removeOverflow();
      document.removeEventListener('click', outsideClickListener);
      closeBtn.removeEventListener('click', closeModal);
    }

    function outsideClickListener(event) {
      const footerModal = document.querySelector('.footer-modal-err');
      if (!footerModal.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-footer-modal');
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('click', outsideClickListener);
  } catch (error) {
    console.error(error);
  }
}

function openCardPageModal() {
  try {
    const instance = basicLightbox.create(`<div class="card-page-modal">
       <button class='close-footer-modal'> <svg class="icon-close-cardPage" width="18" height="18 "  title='close' aria-label="close">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
        <div class='card-page-modal-content'>
        <img src="${cardPageModalImg}" alt="Order success" class='img img-order'/>
        <h3 class='card-page-modal-title'>Order success</h3>
        <p class='card-page-modal-text'>Thank you for shopping at Food Boutique. Your order has been received and is now being freshly prepared just for you! Get ready to indulge in nourishing goodness, delivered right to your doorstep. We're thrilled to be part of your journey to better health and happiness.</p>
    </div>`);
    instance.show();
    addoOverflow();
    function closeModalEsp(event) {
      if (event.key === 'Escape') {
        instance.close();
        removeOverflow();
      }
    }

    function closeModal() {
      instance.close();
      removeOverflow();
      document.removeEventListener('click', outsideClickListener);
      closeBtn.removeEventListener('click', closeModal);
    }

    function outsideClickListener(event) {
      const footerModal = document.querySelector('.card-page-modal');
      if (!footerModal.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-footer-modal');
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('click', outsideClickListener);
  } catch (error) {
    console.error(error);
  }
}

function addoOverflow() {
  document.body.style.overflow = 'hidden';
}

function removeOverflow() {
  document.body.style.overflow = '';
}

export {
  openModal,
  openSubcribeModal,
  openErrorModal,
  openCardPageModal,
  checkIfProductInCart,
};
