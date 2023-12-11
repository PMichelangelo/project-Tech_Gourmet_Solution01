import {
  getServerProductsCategories,
  getServerProductsDiscount,
  getServerProductsPopular,
  getServerProductsById,
  getServerProducts,
} from './fetchProducts';

// getServerProducts(1, null, null);

import {
  appendPopularProductsMarkup,
  appendDiscountProductsMarkup,
} from './createMarkupMoreProducts.js';
import { openCardPageModal } from './modal';
// Count of carts
import { getCountCarts } from './header.js';
//getCountCarts();

appendPopularProductsMarkup();
appendDiscountProductsMarkup();

import { initCartStorage, addToCart, removeFromCart } from './cartStorage';

import { createProductsMarkup } from './createMarkup.js';
createProductsMarkup(1, null, null);

import { filterCategories, filterProducts } from './filters.js';
filterCategories();
filterProducts();
import { onSubmit } from './subscribeEmail';
const emailFInput = document.querySelector('.footer-submit-btn');
emailFInput.addEventListener('click', onSubmit);
openCardPageModal();


