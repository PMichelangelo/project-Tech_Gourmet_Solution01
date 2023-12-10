function updateCartCounter() {
  const storage = JSON.parse(localStorage.getItem('cartData')) || [];
  const counterElement = document.querySelectorAll('.header-counter');
  counterElement[0].textContent = storage.length.toString();
  counterElement[1].textContent = storage.length.toString();
}

// document.addEventListener('DOMContentLoaded', () => {
//   updateCartCounter();
// });

export { updateCartCounter };
