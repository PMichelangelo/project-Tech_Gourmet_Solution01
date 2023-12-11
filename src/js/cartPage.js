import { getCardProducts } from './cartProducts';
import { initCartStorage } from './cartStorage';
import { updateCartCounterOnLoad } from "./updateCartCounter";
document.addEventListener('DOMContentLoaded', () => {
 updateCartCounterOnLoad();
});
initCartStorage();

const cartProductsList = JSON.parse(localStorage.getItem('cartData'));
getCardProducts(cartProductsList);


///////////sendForm/////////////////
const form = document.querySelector('.cart_checkout_btn')
import { getServerProductsById } from './fetchProducts'
getArray(cartProductsList)
async function getArray(cartProductsList){
  if (!cartProductsList.length){form.disabled = false }
  else {form.disabled = true} 
  try {
    const foodItems = await Promise.all(
      cartProductsList.map(productId => getServerProductsById(productId))
    );
    const transformedData = foodItems.map(item => {
      return {
        productId: item._id,
        price: item.price
      };});
      console.log(transformedData);
  }
  catch (error) {
    console.log(error);
  }  
}

form.addEventListener('submit', onForm)
function onForm(event) {
  event.preventDefault();
  emailInput = document.querySelector('.cart-basket-input');
  const email = emailInput.value;

}