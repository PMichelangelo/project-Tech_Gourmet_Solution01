import {appendPopularProductsMarkup, appendDiscountProductsMarkup,} from './createMarkupMoreProducts.js';


appendPopularProductsMarkup();
appendDiscountProductsMarkup();


import { createProductsMarkup } from './createMarkup.js';
createProductsMarkup(1, null, null);


import { filterCategories, filterProducts } from './filters.js';
filterCategories();
filterProducts();
import { onSubmit } from './subscribeEmail';
import {scrollToTop } from './scroll-up-btn'
const emailFInput = document.querySelector('.footer-submit-btn');
emailFInput.addEventListener('click', onSubmit);

scrollToTop()