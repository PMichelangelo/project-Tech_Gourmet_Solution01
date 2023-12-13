import { getServerProducts } from "./fetchProducts";
import { openModal } from "./modal";
import { addToCart,updateCardState  } from "./cartStorage";
import { updateCartCounterOnLoad } from "./updateCartCounter";
import { checkIfProductInCart } from "./modal";
import { removeFromCart } from './cartStorage';
import icons from '../img/icons.svg'

const productCard = document.querySelector('.product-list');

async function createProductsMarkup() {
  console.log("Creating products markup");

  try {
    // const data = await getServerProducts(1, null, null);
    // checkIsItemInCart();
    // productCard.innerHTML = createMarkup(data.results);
    //if (data.results) {
    //  checkIsItemInCart()
    //}
    //const productCards = document.querySelectorAll('.js-card');
    //console.log("Number of product cards:", productCards.length);

    productCard.addEventListener('click', (event) => {
      const card = event.target.closest('.js-card');
      const btn = event.target.closest('.js-btn');

      if (card) {
        const productId = card.getAttribute('data-id');
        console.log("Product clicked:", productId);

        if (btn) {
          console.log("Button clicked within the product card");

          const isProductInCart = checkIfProductInCart(productId);

          if (isProductInCart) {
            removeFromCart(productId);
            btn.classList.remove('added');
          } else {
            addToCart(productId);
            btn.classList.add('added');
          }

          updateCartCounterOnLoad();
        } else {
          openModal(productId);
        }
      }
    });
    //document.querySelector('.js-products-container').classList.remove('hidden')
  } catch (error) {
    console.error(error);
  }
};

async function checkIsItemInCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartData"))
  const itemsOnPage = document.querySelectorAll('.js-card')
  const itemsArr = Array.from(itemsOnPage)

  itemsArr.forEach(item => {
    const itemId = item.dataset.id
    cartItems.forEach(id => {
      console.log(id === itemId)
      if (itemId === id) {
        const matchedItem = document.querySelector(`.js-btn[data-id='${id}']`)
        console.log(matchedItem)
        matchedItem.classList.add('added')
        matchedItem.setAttribute("disabled", "disabled")
      }
    })
  })
}


function createMarkup(arr) {

  return arr
    .map(
      ({ img, _id, name, price, size, category, popularity }) => `
        <li class="product-item js-card" data-id="${_id}">
          <div class="container-card">
            <div class="container-img">
              <img class="item-img" src="${img}" alt="${name}" loading="lazy" />
            </div>
            <h3 class="item-name">${name}</h3>
            <div class="container-info">
              <p class="item-info">Category: <span class="span-info">${category.replace('_', ' ').replace('_', ' ')}</span></p>
              <p class="item-info">Size: <span class="span-info">${size.replace('oz', 'g')}</span></p>
              <p class="item-info popular-item-info ">Popularity: <span class="span-info">${popularity}</span></p>
            </div>
            <div class="container-price">
              <p class="item-price">$${price}</p>
              <button type="button" class="btn-item js-btn" data-id="${_id}">
                <svg class="product-button-icon icon-cart" width="18" height="18">
                  <use href="${icons}#icon-shoping-cart"></use>
                </svg>
                <svg class="product-button-icon icon-mark" width="18" height="18">
                  <use href="${icons}#icon-check"></use>
                </svg>
              </button>
            </div>
          </div>
        </li>`
    )
    .join('');
}

export{createProductsMarkup, createMarkup, checkIsItemInCart,disabledBtn}
