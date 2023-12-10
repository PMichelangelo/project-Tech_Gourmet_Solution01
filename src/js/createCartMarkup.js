import getServerProductsById from './fetchProducts'
import icons from '../img/icons.svg'
import { openModal } from './modal';

const refs = { 
    emptyCart: document.querySelector('.cart-empty')
    fullCart: document.querySelector('.cart-list-total')
}

export function createCartProductMarkup() {
    const cartDataString = localStorage.getItem('cartData');
    if (!cartDataString) { 
        refs.fullCart.classList.add('.visually-hidden');
        refs.emptyCart.classList.remove('.visually-hidden');
    }
    const cartData = JSON.parse(cartDataString);

for (const productId of cartData) {
    try {
      const data = await getServerProductsById(productId);
      productCard.innerHTML = createMarkup(data.results);
      } catch (error) {
      console.error(`Error fetching product with id ${productId}: ${error.message}`);
    }
  }
}

export function cartOrder(cart) {
  return cart
    .map(
      item => `
  <li class="cart-order-item">
    <div class="cart-item-content">
      <div class="cart-order-img-cont">
        <img
          class="cart-order-img"
          src="${item.img}"
          alt="${item.imgDsc}"
        />
      </div>
      <div class="cart-order-desc">
        <div class="cart-order-title-btn">
          <h3 class="cart-order-title">${item.title}</h3>
          <button class="cart-remove-btn" type="button">
            <span class="cart-remove-span">
              <svg class="cart-remove-icon" width="18" height="18">
                <use
                  class="cart-remove-svg"
                  xlink:href="./img/icons.svg#icon-close-btn"
                ></use>
              </svg>
            </span>
          </button>
        </div>
        <p class="cart-order-text">
          <span class="cart-order-span">Category:</span>${item.category}
          <span class="cart-order-span cart-gap">Size:</span>
          ${item.size}
        </p>
        <div class="cart-order-total-price">
          <span class="cart-order-price">$${(
            parseFloat(item.price.replace('$', '')) * item.quantity
          ).toFixed(2)}</span>
          <div class="cart-order-amount">
            <button class="cart-order-decr" type="button"><svg class="minus-icon" width="18" height="18">
                <use
                  class="cart-remove-svg"
                  xlink:href=""
                ></use>
              </svg></button>
            <span class="cart-order-quantity">${item.quantity}</span>
            <button class="cart-order-incr" type="button"><svg class="plus-icon" width="18" height="18">
                <use
                  class="cart-remove-svg"
                  xlink:href=""
                ></use>
              </svg></button>
          </div>
        </div>
      </div>
    </div>
  </li>
  `
    )
    .join('');
}

