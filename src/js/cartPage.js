import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { calculateTotalPrice } from './cartProducts';
import { nullCart } from './cartProducts';
import { removeFromCart } from './cartStorage';

// Рахуємо загальну суму покупки
const total = document.getElementById('cart_total');
calculateTotalPrice().then(data => (total.textContent = `$${data}`));

const cartList = document.querySelector('.cart-order-list');

cartList.addEventListener('click', removeProduct);

function removeProduct(event) {
  const cartEl = event.target.closest('.cart-order-item');

  const removeBtn = event.target.closest('.cart-remove-span');

  if (cartEl) {
    const productId = cartEl.getAttribute('data-id');
    console.log('Product clicked:', productId);

    if (removeBtn) {
      removeFromCart(productId);
      updateCartCounterOnLoad();

      cartEl.style.display = 'none';

      calculateTotalPrice().then(data => (total.textContent = `$${data}`));

      const storage = JSON.parse(localStorage.getItem('cartData'));
      if (!storage.length) {
        nullCart();
      }

      // disabledBtn(btn);
    }
    // else {
    //   openModal(productId);
    // }
  }
}

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

    // const cards = document.querySelectorAll('.cart-order-item');
    // cards.forEach(card => {
    //   card.style.opacity = 0;
    //   card.style.transition = 'opacity 0.5s';
    // });
    nullCart();
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
