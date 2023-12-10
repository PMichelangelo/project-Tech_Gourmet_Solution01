<<<<<<< Updated upstream
// import { getServerProductsById } from "./fetchProducts.js";
=======
import { getServerProductsById } from './fetchProducts.js';
import * as basicLightbox from 'basiclightbox';
import icons from '../img/icons.svg'
import { addToCart } from './cartStorage';
import { updateCartCounterOnLoad } from "./updateCartCounter";
import {removeFromCart} from './cartStorage'
>>>>>>> Stashed changes

const modal = document.querySelector(".modalka");
const openModalBtn = document.getElementById("openModalBtn");

openModalBtn.addEventListener("click", openModal);

async function getServerProductsById(id) {
  const URL = 'https://food-boutique.b.goit.study/api';
  const endPoint = 'products';

  try {
    const result = await axios.get(`${URL}/${endPoint}/${id}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function openModal(event) {
  const productId = "640c2dd963a319ea671e383b";

<<<<<<< Updated upstream
=======
function checkIfProductInCart(productId) {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  return cartData.includes(productId);
};


async function openModal(productId) {
>>>>>>> Stashed changes
  try {
    const productData = await getServerProductsById(productId);
    console.log(productData);


<<<<<<< Updated upstream
    const instance = basicLightbox.create(`
      <img src="${productData.img}" alt="${productData.name}"> 
      <p>${productData.name}</p>
      <p>${productData.category}</p>
      <p>${productData.size}</p>
      <p>${productData.popularity}</p>
      <p>${productData.desc}</p>
      <p>${productData.price}</p>
      <button>Add to cart</button>
     `);
=======
    modalContent.innerHTML = 
    `<div class="modal-container" data-id="${productData._id}">
    <div class="modal-img-info-container">
        <div class="modal-img-container">
            <img class="modal-img" src="${productData.img}" alt="${productData.name}" loading="lazy" />
        </div>
        <div class="modal-name-container">
            <h3 class="modal-name">${productData.name}</h3>
            <div class="modal-info-container">
                <p class="modal-info">Category: <span class="modal-span-info">${productData.category.replace('_', ' ').replace('_', ' ')}</span></p>
                <p class="modal-info">Size: <span class="modal-span-info">${productData.size.replace('oz', 'g')}</span></p>
                <p class="modal-info">Popularity: <span class="modal-span-info">${productData.popularity}</span></p>
            </div>
            <p class="modal-desc">${productData.desc}</p>
        </div>
    </div>
    <div class="modal-price-container">
        <p class="modal-price">$${productData.price}</p>
        <button type="button" class="modal-button js-btn">
            <span class="modal-button-text">Add to</span>
            <svg class="modal-button-icon" width="18" height="18">
                <use href="${icons}#icon-shop"></use>
            </svg>
        </button>
        <button class='close-modal'> <svg class="close-modal-icon" width="10" height="10">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
    </div>
</div>`;

    const instance = basicLightbox.create(modalContent);
   
>>>>>>> Stashed changes
    instance.show();
    
    const closeModal = (event) => {
      if (event.key === "Escape") {
        instance.close();
        document.removeEventListener("keydown", closeModal);
      }
    };

<<<<<<< Updated upstream
    document.addEventListener("keydown", closeModal);
=======
    function closeModal() {
      instance.close();
      revomeOverflow();
    }

    const modal = document.querySelector('.modal-container') 
    modal.addEventListener('click', (e) => {
      if(e.target !== modal)
      return closeModal();
    })
    

    document.addEventListener('keydown', closeModal);
    const closeBtn = document.querySelector('.close-modal-icon');
    closeBtn.addEventListener('click', closeModal);



    const addToCartBtn = document.querySelector(".modal-button");
    addToCartBtn.addEventListener('click', (event) => {
      const card = event.target.closest('.modal-container');
      const btn = event.target.closest('.modal-button');

      if (card && btn) {
        const productId = card.getAttribute('data-id');
        console.log("Product clicked:", productId);

        const buttonTextSpan = btn.querySelector('.modal-button-text');
        const isProductInCart = checkIfProductInCart(productData._id);
        if (isProductInCart) {
          buttonTextSpan.textContent = 'Remove from';
        }
        if (buttonTextSpan.textContent === "Add to") {
          addToCart(productId);
          updateCartCounterOnLoad();
          buttonTextSpan.textContent = 'Remove from';
          btn.classList.add('added-to-cart');
        } else if (buttonTextSpan.textContent === "Remove from") {
          removeFromCart(productId);
          buttonTextSpan.textContent = 'Add to';
          btn.classList.remove('added-to-cart');
        }
      }
    });
    const isProductInCart = checkIfProductInCart(productData._id);
    const buttonTextSpan = addToCartBtn.querySelector('.modal-button-text');

    if (isProductInCart) {
      buttonTextSpan.textContent = 'Remove from';
      btn.classList.add('added-to-cart');
    } else {
      buttonTextSpan.textContent = 'Add to';
      btn.classList.remove('added-to-cart');
    }
>>>>>>> Stashed changes
  } catch (error) {
    console.log('Error fetching product:', error);
  }
<<<<<<< Updated upstream
};
=======
}



function openSubcribeModal() {
  try {
    const instance = basicLightbox.create(`<div class="footer-modal">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content'><h3 class='footer-modal-title'>Thanks for subscribing for <span class='span'>new</span> products</h3>
        <p class='footer-modal-text'>We promise you organic and high-quality products that will meet your expectations. Please stay with us and we promise you many pleasant surprises.</p>
        <picture class='footer-modal-img'>
      <source
        srcset="
          ./img/modal-email-mob.png     1x,
          ./img/modal-email-mob-2x.png  2x
        "
        media="(min-width: 375px) and (max-width: 767px)"
      />
      <source
        srcset="
          ./img/modal-email-tab.png     1x,
          ./img/modal-email-tab-2x.png  2x
        "
        media="(min-width: 768px) and (max-width: 1439px)"
      />
      <source
        srcset="
          ./img/modal-email-desk.png     1x,
          ./img/modal-email-desk-2x.png  2x
        "
        media="(min-width: 1440px)"
      />
      <img src="./img/modal-email-mob.png" alt="vegetables" />
    </picture>
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
>>>>>>> Stashed changes
