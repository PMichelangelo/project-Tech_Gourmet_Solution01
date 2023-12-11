function updateCartCounterOnLoad() {
  const storage = JSON.parse(localStorage.getItem("cartData")) || [];
  const counterElements = document.querySelectorAll('.header-counter, .cart-counter');


  counterElements.forEach((element) => {
    if (element) {
      element.textContent = storage.length.toString();
    } else {
      console.error("Element with class 'header-counter' not found.");
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
});

export { updateCartCounterOnLoad };
