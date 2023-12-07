export function createMarkup(arr) {
    return arr
      .map(
        ({ img, _id, name, price, size, category, popularity }) =>
          `<li class="product-item js-card " data-id="${_id}">
            <div class="container-card">

                 <div class="container-img">
                   <img class = "item-img" src="${img}" alt="${name}" loading="lazy" />
                 </div>
                    <h3 class="item-name">${name}</h3>
                  <div class="container-info">
                   <p class="item-info">Category:<span class="span-info">${category.replace(
                     '_',
                     ' '
                   )}</span></p>
                   <p class="item-info" >Size:<span class="span-info">${size.replace(
                     'oz',
                     'g'
                   )}</span></p>
                   <p class="item-info">Popularity:<span class="span-info" >${popularity}</span></p>
                  </div>
                  <div class="container-price">
                   <p>$${price}</p>
                   <button type="button" class=" btn-item js-btn  "></button>
                  </div>
              </div>

            </li>`
      )
      .join('');
}

