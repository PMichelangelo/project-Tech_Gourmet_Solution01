const counter = document.querySelector('.header-counter');
function getCountCarts() {
  const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
  counter.textContent = cartProductsList.length;
}

export {getCountCarts}
