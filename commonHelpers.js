import{i as y,g as d,r as h,u as n,a as v,o as f,b}from"./assets/subscribeEmail-7423cf80.js";import{a as S}from"./assets/vendor-466561f8.js";function I(t){return t.map(({_id:e,img:r,name:a,price:c,category:s,size:o})=>`
  <li class="cart-order-item" data-id="${e}">
    <div class="cart-item-content">
      <div class="cart-order-img-cont">
        <img
          class="cart-order-img"
          src="${r}"
          alt="${a}"
          loading="lazy"
        />
      </div>
      <div class="cart-order-desc">
        <div class="cart-order-title-btn">
          <h3 class="cart-order-title">${a}</h3>
          <button class="cart-remove-btn" type="button" height="18" title='close' aria-label="close">
            <span class="cart-remove-span">
              <svg class="cart-remove-icon" width="18" height="18">
                <use
                  class="cart-remove-svg"
                  xlink:href="${y}#icon-close-btn"
                ></use>
              </svg>
            </span>
          </button>
        </div>
        <p class="cart-order-text">
          <span class="cart-order-span">Category:</span>${s.replace("_"," ").replace("_"," ")}
          <span class="cart-order-span cart-gap">Size:</span>
          ${o.replace("oz","g")}
        </p>
        <div class="cart-order-total-price">

          <div class="cart-order-amount">
            <button class="cart-order-decr" type="button"><svg class="minus-icon" width="18" height="18" title='back' aria-label="back">
                <use
                  class="cart-remove-svg"
                  xlink:href=""
                ></use>
              </svg></button>
            <span class="cart-order-quantity">$${c}</span>
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
  `).join("")}const $="/project-Tech_Gourmet_Solution01/assets/shopping-basket-8d1fa0db.png",k=document.querySelector(".cart-empty"),q=document.querySelector(".cart-list-total"),L=document.querySelector(".cart-order-list");function i(){k.insertAdjacentHTML("beforeend",`<div class="cart-empty-desc">
            <img
              src="${$}"
              srcset=""
              alt="Shopping Basket"
              loading="lazy"
            />
            <h2>Your basket is <span class="cart-empty-cgreen">empty...</span></h2>
            <p class="cart-empty-text">
              Go to the main page to select your favorite products and add them to the
              cart.
            </p>
          </div>
        `),q.classList.add("visually-hidden")}async function D(t){t.length||i();try{const e=await Promise.all(t.map(a=>d(a))),r=I(e);L.insertAdjacentHTML("afterbegin",r)}catch(e){console.error(e)}}async function u(){const t=localStorage.getItem("cartData");if(!t)return 0;const e=JSON.parse(t),r=Object.values(e);let a=0;for(const c of r)try{const s=await d(c);a+=s.price}catch(s){console.error(`Error fetching product with id ${c}: ${s.message}`)}return+a.toFixed(2)}async function P(){const t=await u(),e=document.getElementById("cart_total");e.textContent=`$${t}`}const m=document.getElementById("cart_total");u().then(t=>m.textContent=`$${t}`);const C=document.querySelector(".cart-order-list");C.addEventListener("click",O);function O(t){const e=t.target.closest(".cart-order-item"),r=t.target.closest(".cart-remove-span");if(e){const a=e.getAttribute("data-id");if(r){let c=function(){e.style.display="none"};h(a),n(),e.style.opacity="0",setTimeout(c,500),u().then(o=>m.textContent=`$${o}`),JSON.parse(localStorage.getItem("cartData")).length||i()}}}document.addEventListener("DOMContentLoaded",()=>{n(),P(),v();const t=JSON.parse(localStorage.getItem("cartData"));D(t),document.querySelector(".cart-clear-btn").addEventListener("click",()=>{document.querySelector(".cart-order-list").innerHTML="",localStorage.setItem("cartData",JSON.stringify([])),n();const r=document.querySelector(".cart-list-total");r.style.opacity="0",setTimeout(i,350)})});const g=document.querySelector(".cart_checkout");document.querySelector(".cart_checkout_btn");g.addEventListener("submit",w);let l,p;async function w(t){t.preventDefault();let e=JSON.parse(localStorage.getItem("cartData"));if(l=document.querySelector(".cart-basket-input").value.trim(),!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(l))return alert("Please enter the correct email!");p=(await Promise.all(e.map(o=>d(o)))).map(o=>({productId:o._id,amount:o.price})),g.reset(),T(p)}function T(t){const e="https://food-boutique.b.goit.study/api/orders",r={email:l,products:t};S.post(e,r).then(a=>{f(),i(),document.querySelector(".cart-order-list").innerHTML="",localStorage.setItem("cartData",JSON.stringify([])),n()}).catch(a=>{alert("An error occurred while attempting the requested operation. Please check the entered data and try again. If the issue persists, contact customer support.")})}const _=document.querySelector(".footer-submit-btn");_.addEventListener("click",b);
//# sourceMappingURL=commonHelpers.js.map
