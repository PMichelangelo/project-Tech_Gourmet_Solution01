// import { initCartStorage } from './cartStorage';

// initCartStorage();
const counter = document.querySelector('.header-counter');
export function getCountCarts() {
  const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
  counter.textContent = cartProductsList.length;
}
