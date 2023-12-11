import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from './updateCartCounter';
import { updateTotalPrice } from './cartProducts'
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
const form = document.querySelector("#checkoutForm")
import { getServerProductsById } from './fetchProducts'
form.addEventListener('submit', onForm)
async function onForm(event){
  event.preventDefault();
  let findproduct=JSON.parse(localStorage.getItem('cartData'));
  const emailInput = document.querySelector('.cart-basket-input');  
  let emailOut=emailInput.value.trim()
  if (emailOut.length === 0) {
    return alert('Please enter the correct email!')           }
    
   try {    
   const foodItems = await Promise.all(
   findproduct.map(productId => getServerProductsById(productId))
   );
  const transformedData = foodItems.map(item => {
  return {
   productId: item._id,
   price: item.price
   };});
   let order ={email: emailOut,
    products: transformedData,}
    POS
  }
  catch (error) {
  console.log(error);
   }  

  }

// Рахуємо загальну суму покупки
const total = document.getElementById('cart_total');
calculateTotalPrice().then(data => (total.textContent = `$${data}`));
calculateTotalPrice();



