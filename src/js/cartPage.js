import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { calculateTotalPrice } from './cartProducts';

document.addEventListener('DOMContentLoaded', () => {
  // Оновлюємо лічильник кількості продуктів в корзині
  updateCartCounterOnLoad();
});
initCartStorage();

const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
getCardProducts(cartProductsList);

// Рахуємо загальну суму покупки
const total = document.getElementById('cart_total');
calculateTotalPrice().then(data => (total.textContent = `$${data}`));
calculateTotalPrice();

///////////sendForm/////////////////
const form = document.querySelector('.cart_checkout_btn');
form.addEventListener('submit', onForm);
function onForm(event) {
  event.preventDefault();
  console.dir(event);
}
// const emailInput = event.target.........
//const email = emailInput.value;

// console.log(email);

//
//   const orderProducts = cartProductsList.map(product => {
//     return {
//       productId: product._id,
//       amount: product.price,
//     };
//   });

//
