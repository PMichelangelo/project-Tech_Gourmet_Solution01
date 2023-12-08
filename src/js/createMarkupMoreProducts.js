import {
  getServerProductsPopular,
  getServerProductsDiscount,
} from './fetchProducts';
import icons from '../img/icons.svg';

const refs = {
  popularProductCards: document.querySelector('.js-popular-product-cards'),
  discountProductCards: document.querySelector('.js-discount-product-cards'),
};

/*Popular Products fnct*/

export async function appendPopularProductsMarkup() {
  try {
    const data = await getServerProductsPopular();
    refs.popularProductCards.insertAdjacentHTML(
      'beforeend',
      createPopularMarkup(data.results)
    );
  } catch (error) {
    console.error(error);
  }
}
function createPopularMarkup(results) {
  return results
    .map(
      ({ _id, img, name, category, size, popularity, icons }) =>
        `<div class="container-for-popular-items" id="${_id}">
          <div class="aside-product-card" id="${_id}">
                  <div class="aside-card-img">
                      <img class="aside-img"
                      width="16" height="16"
                          src="${img}"
                          alt="${name}">
                  </div>
                 <div class="container-for-name-descr">
                  <div class="card-product-name-container">
                  <h3 class="aside-card-name">${name}</h3>
                     </div>
                  <div class="products-card-description">
                      <div class="aside-card-description">
                          <p class="descr-p">Category:</p>
                          <p class="card-descr-value">${category}</p>
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
                      <button type="button" class="products-card-btn" id="${_id}">
                          <svg width="16" height="16">
                              <use class="popular-button-icon" href="../img/icons.svg#icon-shop"></use>
                          </svg>
                      </button>
                  </div>
              </div>
              </div>`
    )
    .join('');
}

/*Discount Products fnct*/

export async function appendDiscountProductsMarkup() {
  try {
    const data = await getServerProductsDiscount();
    refs.discountProductCards.insertAdjacentHTML(
      'beforeend',
      createDiscountMarkup(data.results)
    );
  } catch (error) {
    console.error(error);
  }
}

function createDiscountMarkup(results) {
  // const renderData = data.slice(0, 2);
  return results
    .map(
      ({ _id, name, img, price }) =>
        `<div class="container-for-discount-items" id="${_id}">
          <div class="discount-product-card" id="${_id}">
                  <div class="discount-product-card-img">
                      <img class="discount-card-img"
                          src="${img}"
                          alt="${name}">
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
                      <button type="button" class="discount-product-card-btn" id="${_id}">
                          <svg width="18" height="18">
                              <use class="discount-button-icon" href="icons.svg#icon-shop#icon-cart"></use>
                          </svg>
                      </button>
                  </div>
                  </div>
              </div>
              </div>`
    )
    .join('');
}
