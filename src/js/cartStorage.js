import { updateCartCounterOnLoad } from "./updateCartCounter";
import { checkIfProductInCart } from "./modal";

function initCartStorage() {
  const hasCartData = localStorage.getItem("cartData")
  !hasCartData && localStorage.setItem("cartData", JSON.stringify([]))
}
/*addToCart*/
function addToCart(productId) {
  const storage = JSON.parse(localStorage.getItem("cartData")) || [];
  storage.push(productId);
  localStorage.setItem("cartData", JSON.stringify(storage));
  updateCartCounterOnLoad()
}

function removeFromCart(productId) {
  const storage = JSON.parse(localStorage.getItem("cartData"));
  const updatedStorage = storage.filter(id => id != productId)
  localStorage.setItem("cartData", JSON.stringify(updatedStorage))
  updateCartCounterOnLoad()
}

function updateCardState(productId) {
  const cardElement = document.querySelector(`.js-card[data-id='${productId}']`);
  const btnElement = document.querySelectorAll(`.js-btn[data-id='${productId}']`);


  const btnElementArr = Array.from(btnElement)
  btnElementArr.forEach((btn) => {
    if (checkIfProductInCart(productId)) {
      btn.classList.add('added');
    } else {
      btn.classList.remove('added');
    }
  })
};

export {
  initCartStorage,
  addToCart,
  removeFromCart,
  updateCardState
}
