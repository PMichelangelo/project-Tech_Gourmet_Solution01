import{c as M,u as A,d as x,r as G,e as K,i as B,f as Q,h as V,j as b,k as h,l as W,b as X}from"./assets/subscribeEmail-7423cf80.js";import"./assets/vendor-466561f8.js";const Z=document.querySelector(".product-list");async function _(){try{Z.addEventListener("click",e=>{const n=e.target.closest(".js-card"),i=e.target.closest(".js-btn");if(n){const a=n.getAttribute("data-id");i?(N(a),M(a),A(),f()):x(a)}})}catch(e){console.error(e)}}function N(e){const n=JSON.parse(localStorage.getItem("cartData"));Array.from(n).includes(e)?G(e):K(e)}async function f(){const e=JSON.parse(localStorage.getItem("cartData")),n=document.querySelectorAll(".js-card");Array.from(n).forEach(a=>{const s=a.dataset.id;e.forEach(r=>{s===r&&document.querySelector(`.js-btn[data-id='${r}']`).classList.add("added")})})}function m(e){return e.map(({img:n,_id:i,name:a,price:s,size:r,category:l,popularity:g})=>`
        <li class="product-item js-card" data-id="${i}">
          <div class="container-card">
            <div class="container-img">
              <img class="item-img" src="${n}" alt="${a}" loading="lazy" />
            </div>
            <h3 class="item-name">${a}</h3>
            <div class="container-info">
              <p class="item-info">Category: <span class="span-info">${l.replace("_"," ").replace("_"," ")}</span></p>
              <p class="item-info">Size: <span class="span-info">${r.replace("oz","g")}</span></p>
              <p class="item-info popular-item-info ">Popularity: <span class="span-info">${g}</span></p>
            </div>
            <div class="container-price">
              <p class="item-price">$${s}</p>
              <button type="button" class="btn-item js-btn" data-id="${i}" title='Add item' aria-label="Add item">
                <svg class="product-button-icon icon-cart" width="18" height="18">
                  <use href="${B}#icon-shoping-cart"></use>
                </svg>
                <svg class="product-button-icon icon-mark" width="18" height="18">
                  <use href="${B}#icon-check"></use>
                </svg>
              </button>
            </div>
          </div>
        </li>`).join("")}const C={popularProductCards:document.querySelector(".js-popular-product-cards"),discountProductCards:document.querySelector(".js-discount-product-cards")};async function tt(){try{const e=await Q();C.popularProductCards.insertAdjacentHTML("beforeend",et(e.results)),f(),C.popularProductCards.addEventListener("click",n=>{const i=n.target.closest(".aside-product-card"),a=n.target.closest(".products-card-btn");if(i){const s=i.getAttribute("id");a?(N(s),M(s),A(),f()):x(s)}})}catch(e){console.error(e)}}function et(e){return e.slice(0,5).map(({_id:i,img:a,name:s,category:r,size:l,popularity:g})=>`<div class="container-for-popular-items js-card" data-id="${i}" id="${i}">
          <div class="aside-product-card" id="${i}">
                  <div class="aside-card-img">
                      <img class="aside-img"
                      width="56" height="56"
                          src="${a}"
                          alt="${s}" loading="lazy">
                  </div>
                 <div class="container-for-name-descr">
                  <div class="card-product-name-container">
                  <h3 class="aside-card-name">${s}</h3>
                     </div>
                  <div class="products-card-description">
                      <div class="aside-card-description">
                          <p class="descr-p">Category:</p>
                          <p class="card-descr-value">${r.replace("_"," ").replace("_"," ")}</p>
                      </div>
                      <div class="size-popularity-container">
                      <div class="aside-card-description">
                          <p class="descr-p">Size:</p>
                          <p class="card-descr-value">${l}</p>
                      </div>
                      <div class="aside-card-description">
                          <p class="descr-p">Popularity:</p>
                          <p class="card-descr-value">${g}</p>
                      </div>
                  </div>
                  </div>
                  </div>
                  <div class="product-card-prices-btn">
                      <button type="button" class="products-card-btn js-btn" data-id="${i}" id="${i}"  title='Add item' aria-label="Add item">
                          <svg width="16" height="16" class="product-button-icon icon-cart">
                              <use class="popular-button-icon" href="${B}#icon-shop"></use>
                          </svg>
                          <svg class="product-button-icon icon-mark" width="12" height="12">
                              <use href="${B}#icon-check"></use>
                          </svg>
                      </button>
                  </div>
              </div>
              </div>`).join("")}async function nt(){try{const e=await V();C.discountProductCards.insertAdjacentHTML("beforeend",it(e)),f(),C.discountProductCards.addEventListener("click",n=>{const i=n.target.closest(".discount-product-card"),a=n.target.closest(".discount-product-card-btn");if(i){const s=i.getAttribute("id");a?(N(s),M(s),A(),f()):x(s)}})}catch(e){console.error(e)}}function it(e){return e.slice(0,2).map(({_id:i,name:a,img:s,price:r})=>`<div class="container-for-discount-items js-card" data-id="${i}" id="${i}">
          <div class="discount-product-card" id="${i}">
                  <div class="discount-product-card-img">
                      <img class="discount-card-img"
                          src="${s}"
                          alt="${a}" loading="lazy">
                          <span class="discount-svg">
                          <svg width="60" height="60" >
                              <use  href="${B}#icon-discount"></use>
                          </svg>
                          </span>
                  </div>
                  <div class="product-card-prices-btn">
                  <h3 class="discount-product-card-name">${a}</h3>
                 <div class="discount-price-icon-container">
                      <p class="product-card-price">$${r}</p>
                      <button type="button" class="discount-product-card-btn js-btn" id="${i}" data-id="${i}">
                          <svg width="18" height="18" class="product-button-icon icon-cart">
                              <use class="discount-button-icon" href="${B}#icon-cart"></use>
                          </svg>
                          <svg class="product-button-icon icon-mark" width="18" height="18">
                              <use href="${B}#icon-check"></use>
                          </svg>
                      </button>
                  </div>
                  </div>
              </div>
              </div>`).join("")}const L=(e,n)=>{try{const i=JSON.stringify(n);localStorage.setItem(e,i)}catch(i){console.error("Set state error: ",i.message)}},y=e=>{try{const n=localStorage.getItem(e);return n===null?void 0:JSON.parse(n)}catch(n){console.error("Get state error: ",n.message)}},t={productCard:document.querySelector(".product-list"),pagination:document.querySelector(".products-pagination"),paginationBtnList:document.querySelector(".pagination-btn-list"),paginationBtnIncr:document.querySelector(".pagination-btn-increment"),paginationBtnDecr:document.querySelector(".pagination-btn-decrement")};function $(e){return`<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">1</button></li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">2</button></li>
    <li class="ellipsis">...</li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${e-1}</button></li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${e}</button></li>`}function O(e,n){return`<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">1</button></li>
    <li class="ellipsis">...</li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn pag-middle-btn">${e}</button></li>
    <li class="ellipsis">...</li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${n}</button></li>`}function j(e,n){n.currentTarget.disabled=!0;let i;document.querySelectorAll(".pagination-btn").forEach(l=>{l.classList.contains("pagination-btn-active")&&(i=Number(l.textContent))});let{keyword:a,category:s}=y("filtersOfProducts"),r=h();b(i+1,a,s,r).then(({results:l,totalPages:g,page:c,perPage:v})=>{const p=m(l);t.productCard.innerHTML=p,t.pagination.classList.remove("filters-visually-hidden"),f(),L("filtersOfProducts",{keyword:a,category:s,page:c,limit:r}),document.querySelectorAll(".pagination-btn").forEach(o=>{o.classList.contains("pagination-btn-active")&&(o.classList.remove("pagination-btn-active"),o.disabled=!1),Number(o.textContent)===c&&(o.classList.add("pagination-btn-active"),o.disabled=!0)}),i+1===e?(t.paginationBtnIncr.disabled=!0,t.paginationBtnDecr.disabled=!1):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1)})}function H(e){e.currentTarget.disabled=!0;let n;document.querySelectorAll(".pagination-btn").forEach(r=>{r.classList.contains("pagination-btn-active")&&(n=Number(r.textContent))});let{keyword:i,category:a}=y("filtersOfProducts"),s=h();b(n-1,i,a,s).then(({results:r,totalPages:l,page:g,perPage:c})=>{const v=m(r);t.productCard.innerHTML=v,f(),t.pagination.classList.remove("filters-visually-hidden"),L("filtersOfProducts",{keyword:i,category:a,page:g,limit:s}),document.querySelectorAll(".pagination-btn").forEach(p=>{p.classList.contains("pagination-btn-active")&&(p.classList.remove("pagination-btn-active"),p.disabled=!1),Number(p.textContent)===g&&(p.classList.add("pagination-btn-active"),p.disabled=!0)}),n-1===1?(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!0):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1)})}function z(e,n){if(!n.target.classList.contains("pagination-btn"))return;n.target.disabled=!0;const i=Number(n.target.textContent);let{keyword:a,category:s}=y("filtersOfProducts"),r=h();b(i,a,s,r).then(({results:l,totalPages:g,page:c,perPage:v})=>{const p=m(l);t.productCard.innerHTML=p,f(),L("filtersOfProducts",{keyword:a,category:s,page:c,limit:r}),document.querySelectorAll(".pagination-btn").forEach(o=>{o.classList.contains("pagination-btn-active")&&(o.classList.remove("pagination-btn-active"),o.disabled=!1),Number(o.textContent)===c&&(o.classList.add("pagination-btn-active"),o.disabled=!0)}),i===1?(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!0):i===e?(t.paginationBtnIncr.disabled=!0,t.paginationBtnDecr.disabled=!1):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1)})}function F(e,n){n.currentTarget.disabled=!0;let i;document.querySelectorAll(".pagination-btn").forEach(l=>{l.classList.contains("pagination-btn-active")&&(i=Number(l.textContent))});let{keyword:a,category:s}=y("filtersOfProducts"),r=h();b(i+1,a,s,r).then(({results:l,totalPages:g,page:c,perPage:v})=>{const p=m(l);t.productCard.innerHTML=p,f(),t.pagination.classList.remove("filters-visually-hidden"),L("filtersOfProducts",{keyword:a,category:s,page:c,limit:r}),c===3?t.paginationBtnList.innerHTML=O(c,e):c-1===e-2?t.paginationBtnList.innerHTML=$(e):c-1<e-1&&document.querySelector(".pag-middle-btn")&&(document.querySelector(".pag-middle-btn").textContent=Number(document.querySelector(".pag-middle-btn").textContent)+1),document.querySelectorAll(".pagination-btn").forEach(o=>{o.classList.contains("pagination-btn-active")&&(o.classList.remove("pagination-btn-active"),o.disabled=!1),Number(o.textContent)===c&&(o.classList.add("pagination-btn-active"),o.disabled=!0)}),i+1===e?(t.paginationBtnIncr.disabled=!0,t.paginationBtnDecr.disabled=!1):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1)})}function J(e,n){n.currentTarget.disabled=!0;let i;document.querySelectorAll(".pagination-btn").forEach(l=>{l.classList.contains("pagination-btn-active")&&(i=Number(l.textContent))});let{keyword:a,category:s}=y("filtersOfProducts"),r=h();b(i-1,a,s,r).then(({results:l,totalPages:g,page:c,perPage:v})=>{const p=m(l);t.productCard.innerHTML=p,f(),t.pagination.classList.remove("filters-visually-hidden"),L("filtersOfProducts",{keyword:a,category:s,page:c,limit:r}),c===e-2?t.paginationBtnList.innerHTML=O(c,e):c===2?t.paginationBtnList.innerHTML=$(e):c>2&&document.querySelector(".pag-middle-btn")&&(document.querySelector(".pag-middle-btn").textContent=Number(document.querySelector(".pag-middle-btn").textContent)-1),document.querySelectorAll(".pagination-btn").forEach(o=>{o.classList.contains("pagination-btn-active")&&(o.classList.remove("pagination-btn-active"),o.disabled=!1),Number(o.textContent)===c&&(o.classList.add("pagination-btn-active"),o.disabled=!0)}),i-1===1?(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!0):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1)})}function R(e,n){if(!n.target.classList.contains("pagination-btn"))return;n.target.disabled=!0;const i=Number(n.target.textContent);let{keyword:a,category:s}=y("filtersOfProducts"),r=h();b(i,a,s,r).then(({results:l,totalPages:g,page:c,perPage:v})=>{const p=m(l);t.productCard.innerHTML=p,f(),L("filtersOfProducts",{keyword:a,category:s,page:c,limit:r}),(c===e||c===1)&&document.querySelector(".pag-middle-btn")&&(t.paginationBtnList.innerHTML=$(e)),document.querySelectorAll(".pagination-btn").forEach(o=>{o.classList.contains("pagination-btn-active")&&(o.classList.remove("pagination-btn-active"),o.disabled=!1),Number(o.textContent)===c&&(o.classList.add("pagination-btn-active"),o.disabled=!0)}),i===1?(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!0):i===e?(t.paginationBtnIncr.disabled=!0,t.paginationBtnDecr.disabled=!1):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1)})}let d,P=j.bind(null,d),w=H.bind(null),q=z.bind(null,d),E=F.bind(null,d),I=J.bind(null,d),D=R.bind(null,d);function T(e,n,i){if(t.paginationBtnIncr.removeEventListener("click",P),t.paginationBtnDecr.removeEventListener("click",w),t.paginationBtnList.removeEventListener("click",q),t.paginationBtnIncr.removeEventListener("click",E),t.paginationBtnDecr.removeEventListener("click",I),t.paginationBtnList.removeEventListener("click",D),d=Math.ceil(e/i),P=j.bind(null,d),w=H.bind(null),q=z.bind(null,d),E=F.bind(null,d),I=J.bind(null,d),D=R.bind(null,d),d===1){t.pagination.classList.add("filters-visually-hidden");return}if(d<=4){let a="";n===1?(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!0):n===d?(t.paginationBtnIncr.disabled=!0,t.paginationBtnDecr.disabled=!1):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1);for(let s=1;s<=d;s+=1)a+=`<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${s}</button></li>`;t.paginationBtnList.innerHTML=a,document.querySelectorAll(".pagination-btn").forEach(s=>{Number(s.textContent)===n&&(s.classList.add("pagination-btn-active"),s.disabled=!0)}),t.pagination.classList.remove("filters-visually-hidden"),t.paginationBtnIncr.addEventListener("click",P),t.paginationBtnDecr.addEventListener("click",w),t.paginationBtnList.addEventListener("click",q);return}d>4&&(n===1?(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!0):n===d?(t.paginationBtnIncr.disabled=!0,t.paginationBtnDecr.disabled=!1):(t.paginationBtnIncr.disabled=!1,t.paginationBtnDecr.disabled=!1),n===1||n===2||n===d-1||n===d?t.paginationBtnList.innerHTML=$(d):t.paginationBtnList.innerHTML=O(n,d),document.querySelectorAll(".pagination-btn").forEach(a=>{Number(a.textContent)===n&&(a.classList.add("pagination-btn-active"),a.disabled=!0)}),t.pagination.classList.remove("filters-visually-hidden"),t.paginationBtnIncr.addEventListener("click",E),t.paginationBtnDecr.addEventListener("click",I),t.paginationBtnList.addEventListener("click",D))}const u={form:document.querySelector(".filters-form"),input:document.querySelector(".filters-input"),submitBtn:document.querySelector(".filters-btn"),selectBtn:document.querySelector(".filters-select"),selectDropdown:document.querySelector(".filters-options"),selectedCategory:document.querySelector(".filters-select-input"),productCard:document.querySelector(".product-list"),pagination:document.querySelector(".products-pagination")};async function at(){await W().then(e=>{const i=e.map(a=>{let s=a.replace(/_/g," ");return s==="Breads & Bakery"&&(s=s.replace(/&/g,"/")),`<li class="filters-options-item"><button type="submit" class="filters-option" data-value="${a}">${s}</button></li>`}).join("")+'<li class="filters-options-item"><button type="submit" class="filters-option" data-value="null">Show all</button></li>';u.selectDropdown.insertAdjacentHTML("beforeend",i),u.selectBtn.addEventListener("click",a=>{a.stopPropagation(),u.selectDropdown.classList.toggle("filters-visually-hidden")}),u.selectDropdown.addEventListener("click",a=>{const s=a.target.textContent,r=a.target.dataset.value;u.selectBtn.textContent=s,u.selectedCategory.value=r}),document.addEventListener("click",a=>u.selectDropdown.classList.add("filters-visually-hidden"))})}function st(){u.productCard.classList.remove("product-list-not-found"),y("filtersOfProducts")===void 0&&L("filtersOfProducts",{keyword:null,category:null,page:1,limit:6});let{keyword:e,category:n,page:i}=y("filtersOfProducts"),a=h();b(i,e,n,a).then(({results:s,totalPages:r,page:l,perPage:g})=>{const c=Math.ceil(r/g);c<l?b(c,e,n,a).then(({results:v,totalPages:p,page:o,perPage:Y})=>{u.productCard.innerHTML=m(v),T(p,o,Y),f(),k()}):(u.productCard.innerHTML=m(s),T(r,l,g),f(),k())}),u.form.addEventListener("submit",rt)}function rt(e){e.preventDefault(),u.submitBtn.disabled=!0;const n=h(),i=u.input.value||null,a=u.selectedCategory.value||null;b(1,i,a,n).then(({results:s,totalPages:r,page:l,perPage:g})=>{if(r===0){const c=`<li class="products-not-found">
                <h3 class="products-heading">Nothing was found for the selected <span class="products-heading-accent">filters...</span></h3>
                <p class="products-text">Try adjusting your search parameters or browse our range by other criteria to find the perfect product for you.</p>
            </li>`;u.productCard.innerHTML=c,u.productCard.classList.add("product-list-not-found"),u.submitBtn.disabled=!1,u.pagination.classList.add("filters-visually-hidden"),k();return}u.productCard.classList.remove("product-list-not-found"),u.productCard.innerHTML=m(s),f(),k(),L("filtersOfProducts",{keyword:i,category:a,page:1,limit:n}),T(r,l,g),u.submitBtn.disabled=!1})}function k(){document.querySelector(".js-products-container").classList.remove("hidden")}const U=()=>{window.scrollTo(0,0)},S=document.querySelector(".btn-up");S.addEventListener("click",U);window.onscroll=()=>{window.scrollY>600?(S.classList.remove("visually-hidden"),S.classList.remove("btn-up-hidden")):window.scrollY<600&&S.classList.add("visually-hidden")};tt();nt();_();at();st();const ot=document.querySelector(".footer-submit-btn");ot.addEventListener("click",X);U();
//# sourceMappingURL=commonHelpers2.js.map
