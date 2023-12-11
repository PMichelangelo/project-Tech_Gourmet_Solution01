import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { openCardPageModal } from './modal';
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

    const cards = document.querySelectorAll('.cart-order-item');
    cards.forEach(card => {
      card.style.opacity = 0;
      card.style.transition = 'opacity 0.5s';
    });
  });
});

///////////sendForm/////////////////
// const form = document.querySelector('.cart_checkout_btn');
const form = document.getElementById('checkoutBtn');
console.log(form);
form.addEventListener('submit', sendData);
async function sendData() {
  console.log(1);
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