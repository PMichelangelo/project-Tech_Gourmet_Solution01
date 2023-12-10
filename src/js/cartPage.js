import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounter } from './updateCartCounter.js';
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounter();
});
initCartStorage();

const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
getCardProducts(cartProductsList);
