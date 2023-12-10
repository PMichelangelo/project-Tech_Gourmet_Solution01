
import { getServerProductsById } from './fetchProducts'
import { createMarkup } from './createMarkup'
const galleryEl = document.querySelector('.js-carTgallery')


const emptyCart = document.querySelector('.cart-empty'),
  cartList = document.querySelector('.cart-list-wrapper'),
  cartOrderList = document.querySelector('.cart-order-list');

async function getCardProducts(productsList) {
  // відмальовуємо якщо пустий масив в локал сторедж
  if (!productsList.length) {
    emptyCart.insertAdjacentHTML(
      'beforeend',
      `<div class="cart-empty-desc">
            <img
              src="../img/shopping-basket.png"
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
    // приховуємо основну розмітку
    cartList.classList.add('visually-hidden');
  }

  try {
    const products = await Promise.all(
      productsList.map(productId => getServerProductsById(productId))
    );
    const cartMarkup = createMarkup(products);
    cartOrderList.insertAdjacentHTML('beforeend', cartMarkup);
  } catch (error) {
    console.log(error);
  }
}

export { getCardProducts };
