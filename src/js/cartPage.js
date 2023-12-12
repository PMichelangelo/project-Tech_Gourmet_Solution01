import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { updateTotalPrice } from './cartProducts';
import { openCardPageModal } from './modal';
import { calculateTotalPrice } from './cartProducts';
import { nullCart } from './cartProducts';
import { removeFromCart } from './cartStorage';
import { getServerProductsById } from './fetchProducts';
import { onSubmit } from './subscribeEmail';
import axios from 'axios';

// Рахуємо загальну суму покупки
const total = document.getElementById('cart_total');
calculateTotalPrice().then(data => (total.textContent = `$${data}`));

const cartList = document.querySelector('.cart-order-list');

cartList.addEventListener('click', removeProduct);

function removeProduct(event) {
  const cartEl = event.target.closest('.cart-order-item');

  const removeBtn = event.target.closest('.cart-remove-span');

  if (cartEl) {
    const productId = cartEl.getAttribute('data-id');
    console.log('Product clicked:', productId);

    if (removeBtn) {
      removeFromCart(productId);
      updateCartCounterOnLoad();

      cartEl.style.display = 'none';

      calculateTotalPrice().then(data => (total.textContent = `$${data}`));

      const storage = JSON.parse(localStorage.getItem('cartData'));
      if (!storage.length) {
        nullCart();
      }

      // disabledBtn(btn);
    }
    // else {
    //   openModal(productId);
    // }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
  updateTotalPrice();
  initCartStorage();

  const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
  getCardProducts(cartProductsList);

  const clearAllBtn = document.querySelector('.cart-clear-btn');

  clearAllBtn.addEventListener('click', () => {
    document.querySelector('.cart-order-list').innerHTML = '';

    localStorage.setItem('cartData', JSON.stringify([]));

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

//form.addEventListener('submit', senndForm)

// async function senndForm(event) {
//   event.preventDefault();
//   let findproduct=JSON.parse(localStorage.getItem('cartData'));
//   const emailInput = document.querySelector('.cart-basket-input');
//   let emailOut=emailInput.value.trim()
//   if (emailOut.length === 0) {
//     return alert('Please enter the correct email!')           }

//     const foodItems = await Promise.all(
//       findproduct.map(productId => getServerProductsById(productId))
//       );
//      const transformedData = foodItems.map(item => {
//      return {
//       productId: item._id,
//       amount: item.price
//       };});
//       let order ={
//         email: emailOut,
//         products:transformedData}
//         openCardPageModal()
//         console.log('Form submitted!');
//         console.log(order);
//         form.reset();
//         //sendFormData(order)
// };
// function sendFormData(order) {
//   const serverUrl = 'https://food-boutique.b.goit.study/api/orders';
//   console.log(order);
//   axios
//     .post(serverUrl, order)
//     .then(response => {
//       openCardPageModal();
//     })
//     .catch(error => {
//       if (error.message.includes('409')) {
//         openErrorModal();
//       }
//     })

// }

form.addEventListener('submit', senndForm);
let emailOut;
let order;
async function senndForm(event) {
  event.preventDefault();
  let findproduct = JSON.parse(localStorage.getItem('cartData'));
  const emailInput = document.querySelector('.cart-basket-input');
  emailOut = emailInput.value.trim();
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!pattern.test(emailOut)) {
    return alert('Please enter the correct email!');
  }

  const foodItems = await Promise.all(
    findproduct.map(productId => getServerProductsById(productId))
  );
  const transformedData = foodItems.map(item => {
    return {
      productId: item._id,
      amount: item.price,
    };
  });
  order = transformedData;

  form.reset();
  sendFormData(order);
}

function sendFormData(order) {
  const serverUrl = 'https://food-boutique.b.goit.study/api/orders';

  const formData = {
    email: emailOut,
    products: order,
  };

  axios
    .post(serverUrl, formData)
    .then(response => {
      openCardPageModal();
      nullCart();
      document.querySelector('.cart-order-list').innerHTML = '';

      localStorage.setItem('cartData', JSON.stringify([]));

      updateCartCounterOnLoad();
    })
    .catch(error => {
      alert(
        'An error occurred while attempting the requested operation. Please check the entered data and try again. If the issue persists, contact customer support.'
      );
    });
}

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
const emailFInput = document.querySelector('.footer-submit-btn');
emailFInput.addEventListener('click', onSubmit);
