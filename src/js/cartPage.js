import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { updateTotalPrice } from './cartProducts';
import { openCardPageModal } from './modal';
import { calculateTotalPrice } from './cartProducts';
import { nullCart } from './cartProducts';

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
  updateTotalPrice();
  initCartStorage();

  const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
  getCardProducts(cartProductsList);

  const clearAllBtn = document.querySelector('.cart-clear-btn');

  clearAllBtn.addEventListener('click', () => {
    document.querySelector('.cart-order-list').innerHTML = '';

    localStorage.removeItem('cartData');

    updateCartCounterOnLoad();

    // const cards = document.querySelectorAll('.cart-order-item');
    // cards.forEach(card => {
    //   card.style.opacity = 0;
    //   card.style.transition = 'opacity 0.5s';
    // });
    nullCart();
  });
});

///////////sendForm/////////////////

//const form = document.querySelector('.cart_checkout_btn');
//const form = document.getElementById('checkoutBtn');
//console.log(form);
//form.addEventListener('submit', sendData);
//async function sendData() {
//  console.log(1);
//}

// const emailInput = event.target.........
//const email = emailInput.value;

// const form = document.querySelector('.cart_checkout_btn')
// import { getServerProductsById } from './fetchProducts'
// form.addEventListener('submit', onForm)
// async function onForm(event){
//   event.preventDefault();
//   if (!cartProductsList.length){form.disabled = false }
//   else {form.disabled = true}
//   emailInput = document.querySelector('.cart-basket-input');
//   const email = emailInput.value.trim() ;if(email.length===0){
//     return alert('Please enter the correct email!');
//   }
//   try {
//     const  getArray=await getArray(cartProductsList)
//     const foodItems = await Promise.all(
//       cartProductsList.map(productId => getServerProductsById(productId))
//     );
//     const transformedData = foodItems.map(item => {
//       return {
//         productId: item._id,
//         price: item.price
//       };});
//       console.log(transformedData);
//   }
//   catch (error) {
//     console.log(error);
//   }
// }
const form = document.querySelector('.cart_checkout');
const button = document.querySelector('.cart_checkout_btn');

form.addEventListener('submit', event => {
  event.preventDefault();

  console.log('Form submitted!');
  openCardPageModal();
});

// Note: If you want to handle a click event on the button as well, you can use the following code:
// button.addEventListener('click', () => {
//   // Add your button click logic here
//   console.log('Button clicked!');
// });
// console.log(email);

//
//   const orderProducts = cartProductsList.map(product => {
//     return {
//       productId: product._id,
//       amount: product.price,
//     };
//   });
//

// Рахуємо загальну суму покупки
const total = document.getElementById('cart_total');
calculateTotalPrice().then(data => (total.textContent = `$${data}`));
calculateTotalPrice();
