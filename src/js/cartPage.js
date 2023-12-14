import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { updateTotalPrice } from './cartProducts';
import { openCardPageModal } from './modal';
import { calculateTotalPrice } from './cartProducts';
import { nullCart } from './cartProducts';
import { removeFromCart } from './cartStorage';
import { getServerProductsById } from './fetchProducts';
import { onSubmit } from './subscribeEmail';
import axios from 'axios';

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

    if (removeBtn) {
      removeFromCart(productId);
      updateCartCounterOnLoad();

       cartEl.style.opacity = '0';
      function none() {
        cartEl.style.display = 'none';
      }

      setTimeout(none, 500);

      calculateTotalPrice().then(data => (total.textContent = `$${data}`));

      const storage = JSON.parse(localStorage.getItem('cartData'));
      if (!storage.length) {
        nullCart();
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
  updateTotalPrice();
  initCartStorage();

  const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
  getCardProducts(cartProductsList);

  const clearAllBtn = document.querySelector('.cart-clear-btn');

  clearAllBtn.addEventListener('click', () => {
    document.querySelector('.cart-order-list').innerHTML = '';

    localStorage.setItem('cartData', JSON.stringify([]));

    updateCartCounterOnLoad();

    const cartsTotal = document.querySelector('.cart-list-total');
    cartsTotal.style.opacity = '0';
    setTimeout(nullCart, 350);
  });
});


const form = document.querySelector('.cart_checkout');
const button = document.querySelector('.cart_checkout_btn');


form.addEventListener('submit', senndForm);
let emailOut;
let order;
async function senndForm(event) {
  event.preventDefault();
  let findproduct = JSON.parse(localStorage.getItem('cartData'));
  const emailInput = document.querySelector('.cart-basket-input');
  emailOut = emailInput.value.trim();
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(emailOut)) {
    return alert('Please enter the correct email!');
  }

  const foodItems = await Promise.all(
    findproduct.map(productId => getServerProductsById(productId))
  );
  const transformedData = foodItems.map(item => {
    return {
      productId: item._id,
      amount: item.price,
    };
  });
  order = transformedData;

  form.reset();
  sendFormData(order);
}

function sendFormData(order) {
  const serverUrl = 'https://food-boutique.b.goit.study/api/orders';

  const formData = {
    email: emailOut,
    products: order,
  };

  axios
    .post(serverUrl, formData)
    .then(response => {
      openCardPageModal();
      nullCart();
      document.querySelector('.cart-order-list').innerHTML = '';

      localStorage.setItem('cartData', JSON.stringify([]));

      updateCartCounterOnLoad();
    })
    .catch(error => {
      alert(
        'An error occurred while attempting the requested operation. Please check the entered data and try again. If the issue persists, contact customer support.'
      );
    });
}

const emailFInput = document.querySelector('.footer-submit-btn');
emailFInput.addEventListener('click', onSubmit);
