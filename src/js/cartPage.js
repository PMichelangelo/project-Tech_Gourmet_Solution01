import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { updateTotalPrice } from './cartProducts'

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
  updateTotalPrice();
  initCartStorage();

  const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
  getCardProducts(cartProductsList);

  const clearAllBtn = document.querySelector('.cart-clear-btn');

  clearAllBtn.addEventListener('click', () => {
    document.querySelector('.cart-order-list').innerHTML = '';

    localStorage.removeItem('cartData');

    updateCartCounterOnLoad();

    const cards = document.querySelectorAll('.cart-order-item');
    cards.forEach(card => {
      card.style.opacity = 0;
      card.style.transition = 'opacity 0.5s';
    });
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
