import {appendPopularProductsMarkup, appendDiscountProductsMarkup,} from './createMarkupMoreProducts.js';


appendPopularProductsMarkup();
appendDiscountProductsMarkup();


import { createProductsMarkup } from './createMarkup.js';
createProductsMarkup(1, null, null);

import { filterCategories, filterProducts } from './filters.js';
filterCategories();
filterProducts();
import { onSubmit } from './subscribeEmail';
import { btnToUp } from './scroll-up-btn.js';
const emailFInput = document.querySelector('.footer-submit-btn');
emailFInput.addEventListener('click', onSubmit);

btnToUp()