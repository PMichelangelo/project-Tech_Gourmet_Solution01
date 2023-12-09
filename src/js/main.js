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

appendPopularProductsMarkup();
appendDiscountProductsMarkup();

import {createProductsMarkup} from "./createMarkup.js";
createProductsMarkup(1, null, null)

import {
    filterCategories,
    onSubmit
} from "./filters.js"
filterCategories();
onSubmit();