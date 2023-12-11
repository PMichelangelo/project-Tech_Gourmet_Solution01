import { getServerProducts } from "./fetchProducts";
import { openModal } from "./modal";
import { addToCart } from "./cartStorage";
import { updateCartCounterOnLoad } from "./updateCartCounter";
import { checkIfProductInCart } from "./modal";
import icons from '../img/icons.svg'

const productCard = document.querySelector('.product-list');

export async function createProductsMarkup() {
  console.log("Creating products markup");

  try {
    const data = await getServerProducts(1, null, null);
    productCard.innerHTML = createMarkup(data.results);

    const productCards = document.querySelectorAll('.js-card');
    console.log("Number of product cards:", productCards.length);

    productCard.addEventListener('click', (event) => {
      const card = event.target.closest('.js-card');
      const btn = event.target.closest('.js-btn');

      if (card) {
        const productId = card.getAttribute('data-id');
        console.log("Product clicked:", productId);

        if (btn) {
          console.log("Button clicked within the product card");
          addToCart(productId)
          updateCartCounterOnLoad()
          disabledBtn(btn)
        } else {
          openModal(productId);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function disabledBtn(btn) {
  checkIfProductInCart()
  btn.classList.add('added')
  btn.setAttribute("disabled", "disabled")
}


export function createMarkup(arr) {
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
              <button type="button" class="btn-item js-btn">
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