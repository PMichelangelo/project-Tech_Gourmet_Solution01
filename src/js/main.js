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
