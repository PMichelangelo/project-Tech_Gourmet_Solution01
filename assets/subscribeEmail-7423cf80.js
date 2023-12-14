import{a as l,b as v}from"./vendor-466561f8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();async function k(){const e="https://food-boutique.b.goit.study/api",t="products/categories";try{return(await l.get(`${e}/${t}`)).data}catch(o){console.error(o.message)}}async function B(){const e="https://food-boutique.b.goit.study/api",t="products/discount";try{return(await l.get(`${e}/${t}`)).data}catch(o){console.error(o.message)}}async function J(){const e="https://food-boutique.b.goit.study/api",t="products";try{return(await l.get(`${e}/${t}`)).data}catch(o){console.error(o.message)}}async function C(e){const t="https://food-boutique.b.goit.study/api",o="products";try{return(await l.get(`${t}/${o}/${e}`)).data}catch(a){console.error(a.message)}}async function W(e,t,o,a){const r=await k(),s="https://food-boutique.b.goit.study/api",n="products";if(t!=null&&r.includes(o)){const c=new URLSearchParams({page:e,limit:a,keyword:t,category:o});try{return(await l.get(`${s}/${n}?${c}`)).data}catch(i){console.error(i.message)}}if(t!=null){const c=new URLSearchParams({page:e,limit:a,keyword:t});try{return(await l.get(`${s}/${n}?${c}`)).data}catch(i){console.error(i.message)}}else if(r.includes(o))try{const c=new URLSearchParams({page:e,limit:a,category:o});return(await l.get(`${s}/${n}?${c}`)).data}catch(c){console.error(c.message)}else try{const c=new URLSearchParams({page:e,limit:a});return(await l.get(`${s}/${n}?${c}`)).data}catch(c){console.error(c.message)}}function F(){let e;return window.innerWidth>=1440?e=9:window.innerWidth>=768?e=8:e=6,e}const f="/project-Tech_Gourmet_Solution01/assets/icons-0a0825a5.svg";function w(){const e=JSON.parse(localStorage.getItem("cartData"))||[];document.querySelectorAll(".header-counter, .cart-counter").forEach(o=>{o?o.textContent=e.length.toString():console.error("Element with class 'header-counter' not found.")})}document.addEventListener("DOMContentLoaded",()=>{w()});const $="/project-Tech_Gourmet_Solution01/assets/modal-email-mob-73cb03df.png",M="/project-Tech_Gourmet_Solution01/assets/modal-email-mob-2x-700b42d6.png",P="/project-Tech_Gourmet_Solution01/assets/modal-email-tab-afd72827.png",q="/project-Tech_Gourmet_Solution01/assets/modal-email-tab-2x-354ceea1.png",_="/project-Tech_Gourmet_Solution01/assets/modal-email-tab-afd72827.png",D="/project-Tech_Gourmet_Solution01/assets/modal-email-tab-2x-354ceea1.png",O="/project-Tech_Gourmet_Solution01/assets/cardPageModalImg-47702e30.png";function L(e){return(JSON.parse(localStorage.getItem("cartData"))||[]).includes(e)}let g=!1;async function Z(e){try{let r=function(u){document.querySelector(".modal-container").contains(u.target)||s()},s=function(){a.close(),d(),document.removeEventListener("click",r),c.removeEventListener("click",s),g=!1},n=function(u){u.key==="Escape"&&(a.close(),d(),document.removeEventListener("keydown",n))};const t=await C(e),o=document.createElement("div");o.innerHTML=`<div class="modal-container" data-id="${t._id}">
    <div class="modal-img-info-container">
        <div class="modal-img-container">
            <img class="modal-img" src="${t.img}" alt="${t.name}" loading="lazy" />
        </div>
        <div class="modal-name-container">
            <h3 class="modal-name">${t.name}</h3>
            <div class="modal-info-container">
                <p class="modal-info">Category: <span class="modal-span-info">${t.category.replace("_"," ").replace("_"," ")}</span></p>
                <p class="modal-info">Size: <span class="modal-span-info">${t.size.replace("oz","g")}</span></p>
                <p class="modal-info">Popularity: <span class="modal-span-info">${t.popularity}</span></p>
            </div>
            <p class="modal-desc">${t.desc}</p>
        </div>
    </div>
    <div class="modal-price-container">
        <p class="modal-price">$${t.price}</p>
        <button type="button" class="modal-button js-btn" title='add item' aria-label="add item">
            <span class="modal-button-text">Add to</span>
            <svg class="modal-button-icon" width="18" height="18">
                <use href="${f}#icon-shoping-cart"></use>
            </svg>
        </button>
        <button class='close-modal'> <svg class="close-modal-icon" width="10" height="10">
          <use href="${f}#icon-close-btn"></use>
        </svg></button>
    </div>
</div>`;const a=v.create(o);g||(a.show(),y(),g=!0),document.addEventListener("click",r),document.addEventListener("keydown",n);const c=document.querySelector(".close-modal-icon");c.addEventListener("click",s);const i=document.querySelector(".modal-button");i.addEventListener("click",u=>{const b=u.target.closest(".modal-container"),p=u.target.closest(".modal-button");if(b&&p){const S=b.getAttribute("data-id");g=!1;const m=p.querySelector(".modal-button-text");L(t._id)&&(m.textContent="Remove from"),m.textContent==="Add to"?(j(S),m.textContent="Remove from",p.classList.add("added-to-cart")):m.textContent==="Remove from"&&(A(S),m.textContent="Add to",p.classList.remove("added-to-cart")),R(S)}});const x=L(t._id),E=i.querySelector(".modal-button-text");x?(E.textContent="Remove from",i.classList.add("added-to-cart")):(E.textContent="Add to",i.classList.remove("added-to-cart"))}catch(t){console.error("Error fetching product:",t)}}function T(){try{let t=function(s){s.key==="Escape"&&(e.close(),d(),document.removeEventListener("keydown",t))},o=function(){e.close(),d(),document.removeEventListener("click",a),r.removeEventListener("click",o)},a=function(s){document.querySelector(".footer-modal").contains(s.target)||o()};const e=v.create(`<div class="footer-modal">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10" title='close' aria-label="close">
          <use href="${f}#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content'><h3 class='footer-modal-title'>Thanks for subscribing for <span class='span'>new</span> products</h3>
        <p class='footer-modal-text'>We promise you organic and high-quality products that will meet your expectations. Please stay with us and we promise you many pleasant surprises.</p>
        <picture class='footer-modal-img'>
      <source
        srcset="
          ${$}     1x,
          ${M}  2x
        "
        media="(min-width: 375px) and (max-width: 767px)"
      />
      <source
        srcset="
          ${P}     1x,
          ${q}  2x
        "
        media="(min-width: 768px) and (max-width: 1439px)"
      />
      <source
        srcset="
          ${_}    1x,
          ${D}  2x
        "
        media="(min-width: 1440px)"
      />
      <img src="${$}" alt="vegetables" />
    </picture>
    </div>`);e.show(),y(),document.addEventListener("keydown",t);const r=document.querySelector(".close-footer-modal");r.addEventListener("click",o),document.addEventListener("click",a)}catch(e){console.error(e)}}function I(){try{let t=function(s){s.key==="Escape"&&(e.close(),d(),document.removeEventListener("keydown",t))},o=function(){e.close(),d(),document.removeEventListener("click",a),r.removeEventListener("click",o)},a=function(s){document.querySelector(".footer-modal-err").contains(s.target)||o()};const e=v.create(`<div class="footer-modal-err">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10" title='close' aria-label="close">
          <use href="${f}#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content-err'><h3 class='footer-modal-err-title'>This <span>email address</span> has already been entered</h3>
        <p class='footer-modal-err-text'>You have already subscribed to our new products. Watch for offers at the mailing address.</p>
    </div>`);e.show(),y(),document.addEventListener("keydown",t);const r=document.querySelector(".close-footer-modal");r.addEventListener("click",o),document.addEventListener("click",a)}catch(e){console.error(e)}}function Y(){try{let t=function(s){s.key==="Escape"&&(e.close(),d())},o=function(){e.close(),d(),document.removeEventListener("click",a),r.removeEventListener("click",o)},a=function(s){document.querySelector(".card-page-modal").contains(s.target)||o()};const e=v.create(`<div class="card-page-modal">
       <button class='close-footer-modal'> <svg class="icon-close-cardPage" width="18" height="18 "  title='close' aria-label="close">
          <use href="${f}#icon-close-btn"></use>
        </svg></button>
        <div class='card-page-modal-content'>
        <img src="${O}" alt="Order success" class='img img-order'/>
        <h3 class='card-page-modal-title'>Order success</h3>
        <p class='card-page-modal-text'>Thank you for shopping at Food Boutique. Your order has been received and is now being freshly prepared just for you! Get ready to indulge in nourishing goodness, delivered right to your doorstep. We're thrilled to be part of your journey to better health and happiness.</p>
    </div>`);e.show(),y(),document.addEventListener("keydown",t);const r=document.querySelector(".close-footer-modal");r.addEventListener("click",o),document.addEventListener("click",a)}catch(e){console.error(e)}}function y(){document.body.style.overflow="hidden"}function d(){document.body.style.overflow=""}function H(){!localStorage.getItem("cartData")&&localStorage.setItem("cartData",JSON.stringify([]))}function j(e){const t=JSON.parse(localStorage.getItem("cartData"))||[];t.push(e),localStorage.setItem("cartData",JSON.stringify(t)),w()}function A(e){const o=JSON.parse(localStorage.getItem("cartData")).filter(a=>a!=e);localStorage.setItem("cartData",JSON.stringify(o)),w()}function R(e){document.querySelector(`.js-card[data-id='${e}']`);const t=document.querySelectorAll(`.js-btn[data-id='${e}']`);Array.from(t).forEach(a=>{L(e)?a.classList.add("added"):a.classList.remove("added")})}let h;function K(e){e.preventDefault(),h=document.querySelector(".footer-input"),N(h.value)?U(h.value):alert("Please enter the correct email!")}function N(e){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)}function U(e){const t="https://food-boutique.b.goit.study/api/subscription",o={email:e};l.post(t,o).then(a=>{T()}).catch(a=>{a.message.includes("409")&&I()}).finally(a=>{h.value=""})}export{H as a,K as b,R as c,Z as d,j as e,J as f,C as g,B as h,f as i,W as j,F as k,k as l,Y as o,A as r,w as u};
//# sourceMappingURL=subscribeEmail-7423cf80.js.map
