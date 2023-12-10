import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from "./updateCartCounter";
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
});
initCartStorage();

const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
getCardProducts(cartProductsList);
