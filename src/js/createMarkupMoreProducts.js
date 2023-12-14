import {getServerProductsPopular,getServerProductsDiscount} from './fetchProducts';
import icons from '../img/icons.svg';
import { openModal } from './modal';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { checkIsItemInCart, toggleBtn } from './createMarkup';
import { updateCardState } from './cartStorage';
const refs = {
  popularProductCards: document.querySelector('.js-popular-product-cards'),
  discountProductCards: document.querySelector('.js-discount-product-cards'),
};

/*Popular Products fnct*/

async function appendPopularProductsMarkup() {
  try {
    const data = await getServerProductsPopular();
    refs.popularProductCards.insertAdjacentHTML(
      'beforeend',
      createPopularMarkup(data.results)
    );
    checkIsItemInCart();

    refs.popularProductCards.addEventListener('click', event => {
      const card = event.target.closest('.aside-product-card');
      const btn = event.target.closest('.products-card-btn');
      if (card) {
        const productId = card.getAttribute('id');

        if (btn) {
          toggleBtn(productId);
          updateCardState(productId);
          updateCartCounterOnLoad();
          checkIsItemInCart();
        } else {
          openModal(productId);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function createPopularMarkup(results) {
  const limitedResults = results.slice(0, 5);

  return limitedResults
    .map(
      ({ _id, img, name, category, size, popularity }) =>
        `<div class="container-for-popular-items js-card" data-id="${_id}" id="${_id}">
          <div class="aside-product-card" id="${_id}">
                  <div class="aside-card-img">
                      <img class="aside-img"
                      width="56" height="56"
                          src="${img}"
                          alt="${name}" loading="lazy">
                  </div>
                 <div class="container-for-name-descr">
                  <div class="card-product-name-container">
                  <h3 class="aside-card-name">${name}</h3>
                     </div>
                  <div class="products-card-description">
                      <div class="aside-card-description">
                          <p class="descr-p">Category:</p>
                          <p class="card-descr-value">${category
                            .replace('_', ' ')
                            .replace('_', ' ')}</p>
                      </div>
                      <div class="size-popularity-container">
                      <div class="aside-card-description">
                          <p class="descr-p">Size:</p>
                          <p class="card-descr-value">${size}</p>
                      </div>
                      <div class="aside-card-description">
                          <p class="descr-p">Popularity:</p>
                          <p class="card-descr-value">${popularity}</p>
                      </div>
                  </div>
                  </div>
                  </div>
                  <div class="product-card-prices-btn">
                      <button type="button" class="products-card-btn js-btn" data-id="${_id}" id="${_id}"  title='Add item' aria-label="Add item">
                          <svg width="16" height="16" class="product-button-icon icon-cart">
                              <use class="popular-button-icon" href="${icons}#icon-shop"></use>
                          </svg>
                          <svg class="product-button-icon icon-mark" width="12" height="12">
                              <use href="${icons}#icon-check"></use>
                          </svg>
                      </button>
                  </div>
              </div>
              </div>`
    )
    .join('');
}

/*Discount Products fnct*/

async function appendDiscountProductsMarkup() {
  try {
    const data = await getServerProductsDiscount();
    refs.discountProductCards.insertAdjacentHTML(
      'beforeend',
      createDiscountMarkup(data)
    );
    checkIsItemInCart();

    refs.discountProductCards.addEventListener('click', event => {
      const card = event.target.closest('.discount-product-card');
      const btn = event.target.closest('.discount-product-card-btn');
      if (card) {
        const productId = card.getAttribute('id');

        if (btn) {
          toggleBtn(productId);
          updateCardState(productId);
          updateCartCounterOnLoad();
          checkIsItemInCart();
        } else {
          openModal(productId);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function createDiscountMarkup(results) {
  const limitedResults = results.slice(0, 2);
  return limitedResults
    .map(
      ({ _id, name, img, price }) =>
        `<div class="container-for-discount-items js-card" data-id="${_id}" id="${_id}">
          <div class="discount-product-card" id="${_id}">
                  <div class="discount-product-card-img">
                      <img class="discount-card-img"
                          src="${img}"
                          alt="${name}" loading="lazy">
                          <span class="discount-svg">
                          <svg width="60" height="60" >
                              <use  href="${icons}#icon-discount"></use>
                          </svg>
                          </span>
                  </div>
                  <div class="product-card-prices-btn">
                  <h3 class="discount-product-card-name">${name}</h3>
                 <div class="discount-price-icon-container">
                      <p class="product-card-price">$${price}</p>
                      <button type="button" class="discount-product-card-btn js-btn" id="${_id}" data-id="${_id}">
                          <svg width="18" height="18" class="product-button-icon icon-cart">
                              <use class="discount-button-icon" href="${icons}#icon-cart"></use>
                          </svg>
                          <svg class="product-button-icon icon-mark" width="18" height="18">
                              <use href="${icons}#icon-check"></use>
                          </svg>
                      </button>
                  </div>
                  </div>
              </div>
              </div>`
    )
    .join('');
}

export {appendDiscountProductsMarkup, appendPopularProductsMarkup }