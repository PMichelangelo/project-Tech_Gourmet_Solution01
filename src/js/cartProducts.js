import { getServerProductsById } from './fetchProducts'
import { createMarkup } from './createMarkup'
const galleryEl = document.querySelector('.js-carTgallery')



async function getCardProducts(productsList) {
  if (!productsList.length) galleryEl.insertAdjacentHTML('beforeend', "<span>Your cart is empty</span>")

  try {
    const products = await Promise.all(productsList.map(productId => getServerProductsById(productId)))
    const cartMarkup = createMarkup(products)
    galleryEl.insertAdjacentHTML('beforeend', cartMarkup)

  } catch (error) {
    console.log(error)
  }
}

export {
   getCardProducts
 }
