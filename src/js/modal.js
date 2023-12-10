import { getServerProductsById } from './fetchProducts.js';
import * as basicLightbox from 'basiclightbox';

export { openModal, openSubcribeModal, openErrorModal };

async function openModal(productId) {
  try {
    const productData = await getServerProductsById(productId);

    const modalContent = document.createElement('div');

    modalContent.innerHTML = `
    <div class ="modal-test" ><img src="${productData.img}" alt="${productData.name}">
      <p>${productData.name}</p>
      <p>${productData.category}</p>
      <p>${productData.size}</p>
      <p>${productData.popularity}</p>
      <p>${productData.desc}</p>
      <p>${productData.price}</p>
      <button>Add to cart</button></div>

    `;

    const instance = basicLightbox.create(modalContent);

    instance.show();

    const closeModal = event => {
      if (event.key === 'Escape') {
        instance.close();
        document.removeEventListener('keydown', closeModal);
      }
    };

    document.addEventListener('keydown', closeModal);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}
function openSubcribeModal() {
  try {
    const instance = basicLightbox.create(`<div class="footer-modal">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10">
          <use href="/project-Tech_Gourmet_Solution01/assets/icons-3f1614cc.svg#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content'><h3 class='footer-modal-title'>Thanks for subscribing for <span class='span'>new</span> products</h3>
        <p class='footer-modal-text'>We promise you organic and high-quality products that will meet your expectations. Please stay with us and we promise you many pleasant surprises.</p>
        <img href='/project-Tech_Gourmet_Solution01/assets/footer-img.png'>
    </div>`);
    instance.show();
    addoOverflow();
    function closeModalEsp(event) {
      if (event.key === 'Escape') {
        instance.close();
        revomeOverflow();
      }
    }
    function closeModal() {
      instance.close();
      revomeOverflow();
    }

    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-footer-modal');
    closeBtn.addEventListener('click', closeModal);
  } catch (error) {
    console.error(error);
  }
}
function openErrorModal() {
  try {
    const instance = basicLightbox.create(`<div class="footer-modal-err">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10">
          <use href="/project-Tech_Gourmet_Solution01/assets/icons-3f1614cc.svg#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content-err'><h3 class='footer-modal-err-title'>This <span>email address</span> has already been entered</h3>
        <p class='footer-modal-err-text'>You have already subscribed to our new products. Watch for offers at the mailing address.</p>
    </div>`);
    instance.show();
    addoOverflow();
    function closeModalEsp(event) {
      if (event.key === 'Escape') {
        instance.close();
        revomeOverflow();
      }
    }
    function closeModal() {
      instance.close();
      revomeOverflow();
    }

    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-footer-modal');
    closeBtn.addEventListener('click', closeModal);
  } catch (error) {
    console.error(error);
  }
}
function addoOverflow() {
  document.body.style.overflow = 'hidden';
}

function revomeOverflow() {
  document.body.style.overflow = '';
}
