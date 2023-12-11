import { getServerProductsById } from './fetchProducts';
import { cartOrder } from './createCartMarkup';
const galleryEl = document.querySelector('.js-carTgallery');

const emptyCart = document.querySelector('.cart-empty'),
  cartListTotal = document.querySelector('.cart-list-total'),
  cartOrderList = document.querySelector('.cart-order-list');

//async function getCardProducts(productsList) {
//  // відмальовуємо якщо пустий масив в локал сторедж
//  if (!productsList.length) {
//    emptyCart.insertAdjacentHTML(
//      'beforeend',
//      `<div class="cart-empty-desc">
//             <img
//               src="../img/shopping-basket.png"
//               srcset=""
//               alt="Shopping Basket"
//             />
//             <h2>Your basket is <span class="cart-empty-cgreen">empty...</span></h2>
//             <p class="cart-empty-text">
//               Go to the main page to select your favorite products and add them to the
//               cart.
//             </p>
//           </div>
//         `
//    );
//    // приховуємо основну розмітку
//    cartList.classList.add('visually-hidden');
//  }
//}
async function getCardProducts(productsList) {
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
    cartListTotal.classList.add('visually-hidden');
  }

  try {
    const products = await Promise.all(
      productsList.map(productId => getServerProductsById(productId))
    );
    const cartMarkup = cartOrder(products);
    cartOrderList.insertAdjacentHTML('beforebegin', cartMarkup);
  } catch (error) {
    console.log(error);
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
  // return totalPrice;
  return totalPrice;
}

export { getCardProducts, calculateTotalPrice };
