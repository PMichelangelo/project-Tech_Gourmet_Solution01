import {getServerProductsCategories, getServerProducts, getLimit} from "./fetchProducts.js";
import { createMarkup, checkIsItemInCart } from "./createMarkup.js";
import { save, load } from "./storage.js";
import { createPagination } from "./pagination.js"


const refs = {
    form: document.querySelector(".filters-form"),
    input: document.querySelector(".filters-input"),
    submitBtn: document.querySelector(".filters-btn"),
    selectBtn: document.querySelector(".filters-select"),
    selectDropdown: document.querySelector(".filters-options"),
    selectedCategory: document.querySelector(".filters-select-input"),
    productCard: document.querySelector(".product-list"),
    pagination: document.querySelector(".products-pagination"),
}



async function filterCategories () {
    await getServerProductsCategories().then(data => {
        const strCategories = data.map(el => {
            let newEl = el.replace(/_/g, " ");
            if (newEl === "Breads & Bakery") {
                newEl = newEl.replace(/&/g, "/")
            }
            return `<li class="filters-options-item"><button type="submit" class="filters-option" data-value="${el}">${newEl}</button></li>`
        }).join("");
        const str = strCategories + `<li class="filters-options-item"><button type="submit" class="filters-option" data-value="null">Show all</button></li>`
        refs.selectDropdown.insertAdjacentHTML("beforeend", str);

        refs.selectBtn.addEventListener("click", e => {
            e.stopPropagation();
            refs.selectDropdown.classList.toggle("filters-visually-hidden");
        })

        refs.selectDropdown.addEventListener("click", e => {
            const categoryForUser = e.target.textContent;
            const categoryForUs = e.target.dataset.value;
            refs.selectBtn.textContent = categoryForUser;
            refs.selectedCategory.value = categoryForUs;
        })

        document.addEventListener("click", e => refs.selectDropdown.classList.add("filters-visually-hidden"))
    })
}

function filterProducts() {
    refs.productCard.classList.remove("product-list-not-found");
    if (load("filtersOfProducts") === undefined) {
        save("filtersOfProducts", { keyword: null, category: null, page: 1, limit: 6 });
    }
    let { keyword, category, page } = load("filtersOfProducts");
    let limit = getLimit();
    getServerProducts(page, keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        const maxPage = Math.ceil(totalPages / perPage);
        if (maxPage < page) {
            getServerProducts(maxPage, keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
                refs.productCard.innerHTML = createMarkup(results);
                createPagination(totalPages, page, perPage);
                checkIsItemInCart();
              showContent();
            })
        } else {
            refs.productCard.innerHTML = createMarkup(results);
            createPagination(totalPages, page, perPage);
            checkIsItemInCart();
          showContent();
        }
    })

    refs.form.addEventListener("submit", onSubmit);
}

function onSubmit (event) {
    event.preventDefault();
    refs.submitBtn.disabled = true;

    const limit = getLimit();
    const keyword = refs.input.value || null;
    const category = refs.selectedCategory.value || null;
    getServerProducts(1, keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        if (totalPages === 0) {
            const str =
            `<li class="products-not-found">
                <h3 class="products-heading">Nothing was found for the selected <span class="products-heading-accent">filters...</span></h3>
                <p class="products-text">Try adjusting your search parameters or browse our range by other criteria to find the perfect product for you.</p>
            </li>`;
            refs.productCard.innerHTML = str;
            refs.productCard.classList.add("product-list-not-found");
            // refs.selectBtn.textContent = "Categories";
            refs.submitBtn.disabled = false;
            refs.pagination.classList.add("filters-visually-hidden");
          showContent();
            return
        }
        refs.productCard.classList.remove("product-list-not-found");
        refs.productCard.innerHTML = createMarkup(results);
        checkIsItemInCart();
      showContent();
        save("filtersOfProducts", { keyword, category, page: 1, limit });
        createPagination(totalPages, page, perPage);
        refs.submitBtn.disabled = false;
    })
}

function showContent() {
  document.querySelector('.js-products-container').classList.remove('hidden');
}



export {
    filterCategories,
    filterProducts
}
