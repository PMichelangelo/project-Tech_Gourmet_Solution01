function updateCartCounterOnLoad() {
  const storage = JSON.parse(localStorage.getItem("cartData")) || [];
  const counterElement = document.querySelector('.header-counter');

    if (counterElement) {
    counterElement.textContent = storage.length.toString();
  } else {
    console.error("Element with class 'header-counter' not found.");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
});

export { updateCartCounterOnLoad };
