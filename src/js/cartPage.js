import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
  initCartStorage();

  const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
  getCardProducts(cartProductsList);

  const clearAllBtn = document.querySelector('.cart-clear-btn');

  clearAllBtn.addEventListener('click', () => {
    document.querySelector('.cart-order-list').innerHTML = '';

    localStorage.removeItem('cartData');

    updateCartCounterOnLoad();
  });
});

///////////sendForm/////////////////
const form = document.querySelector('.cart_checkout_btn');
form.addEventListener('submit', onForm);
function onForm(event) {
  event.preventDefault();
  console.dir(event);
}
// const emailInput = event.target.........
//const email = emailInput.value;

// console.log(email);

//
//   const orderProducts = cartProductsList.map(product => {
//     return {
//       productId: product._id,
//       amount: product.price,
//     };
//   });

//
