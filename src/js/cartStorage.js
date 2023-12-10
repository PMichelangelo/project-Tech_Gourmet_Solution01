
function initCartStorage() {
  const hasCartData = localStorage.getItem("cartData")
  !hasCartData && localStorage.setItem("cartData", JSON.stringify([]))
}

function addToCart(productId) {
  const storage = JSON.parse(localStorage.getItem("cartData"));
  storage.push(productId)
  localStorage.setItem("cartData",JSON.stringify(storage))
}

function removeFromCart(productId) {
  const storage = JSON.parse(localStorage.getItem("cartData"));
  const updatedStorage = storage.filter(id => id != productId)
  localStorage.setItem("cartData",JSON.stringify(updatedStorage))
}

export {
  initCartStorage,
  addToCart,
  removeFromCart
};
