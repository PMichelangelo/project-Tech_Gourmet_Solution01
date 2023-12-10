function updateCartCounterOnLoad() {
  const storage = JSON.parse(localStorage.getItem("cartData")) || [];
  const counterElement = document.querySelector('.header-counter');
  counterElement.textContent = storage.length.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
});

export {updateCartCounterOnLoad}