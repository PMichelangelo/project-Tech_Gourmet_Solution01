import { getServerProductsById } from './fetchProducts';
import { cartOrder } from './createCartMarkup';
import shoppingBasket from '../img/shopping-basket.png'


const emptyCart = document.querySelector('.cart-empty'),
  cartListTotal = document.querySelector('.cart-list-total'),
  cartOrderList = document.querySelector('.cart-order-list');

export function nullCart() {
  emptyCart.insertAdjacentHTML(
    'beforeend',
    `<div class="cart-empty-desc">
            <img
              src="${shoppingBasket}"
              srcset=""
              alt="Shopping Basket"
            />
            <h2>Your basket is <span class="cart-empty-cgreen">empty...</span></h2>
            <p class="cart-empty-text">
              Go to the main page to select your favorite products and add them to the
              cart.
            </p>
          </div>
        `
  );
  cartListTotal.classList.add('visually-hidden');
}
async function getCardProducts(productsList) {
  if (!productsList.length) {
    nullCart();
  }

  try {
    const products = await Promise.all(
      productsList.map(productId => getServerProductsById(productId))
    );
    const cartMarkup = cartOrder(products);
    cartOrderList.insertAdjacentHTML('afterbegin', cartMarkup);
  } catch (error) {
    console.error(error);
  }
}

async function calculateTotalPrice() {
  const cartDataString = localStorage.getItem('cartData');
  if (!cartDataString) {
    return 0;
  }
  const cartData = JSON.parse(cartDataString);
  const productIds = Object.values(cartData);
  let totalPrice = 0;
  for (const productId of productIds) {
    try {
      const result = await getServerProductsById(productId);

      totalPrice += result.price;
    } catch (error) {
      console.error(
        `Error fetching product with id ${productId}: ${error.message}`
      );
    }
  }
  return +totalPrice.toFixed(2);
}

async function updateTotalPrice() {
  const totalPrice = await calculateTotalPrice();
  const totalPriceSpan = document.getElementById('cart_total');
  totalPriceSpan.textContent = `$${totalPrice}`;
}

export {
  getCardProducts,
  calculateTotalPrice,
  updateTotalPrice
};
