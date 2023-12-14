import icons from '../img/icons.svg';

export function cartOrder(arr) {
  return arr
    .map(
      ({ _id, img, name, price, category, size }) => `
  <li class="cart-order-item" data-id="${_id}">
    <div class="cart-item-content">
      <div class="cart-order-img-cont">
        <img
          class="cart-order-img"
          src="${img}"
          alt="${name}"
          loading="lazy"
        />
      </div>
      <div class="cart-order-desc">
        <div class="cart-order-title-btn">
          <h3 class="cart-order-title">${name}</h3>
          <button class="cart-remove-btn" type="button" height="18" title='close' aria-label="close">
            <span class="cart-remove-span">
              <svg class="cart-remove-icon" width="18" height="18">
                <use
                  class="cart-remove-svg"
                  xlink:href="${icons}#icon-close-btn"
                ></use>
              </svg>
            </span>
          </button>
        </div>
        <p class="cart-order-text">
          <span class="cart-order-span">Category:</span>${category
            .replace('_', ' ')
            .replace('_', ' ')}
          <span class="cart-order-span cart-gap">Size:</span>
          ${size.replace('oz', 'g')}
        </p>
        <div class="cart-order-total-price">

          <div class="cart-order-amount">
            <button class="cart-order-decr" type="button"><svg class="minus-icon" width="18" height="18" title='back' aria-label="back">
                <use
                  class="cart-remove-svg"
                  xlink:href=""
                ></use>
              </svg></button>
            <span class="cart-order-quantity">$${price}</span>
            <button class="cart-order-incr" type="button"><svg class="plus-icon" width="18" height="18" title='forward' aria-label="forward">
                <use
                  class="cart-remove-svg"
                  xlink:href=""
                ></use>
              </svg></button>
          </div>
        </div>
      </div>
    </div>
  </li>
  `
    )
    .join('');
}
