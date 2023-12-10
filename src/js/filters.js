const refs = {
    form: document.querySelector(".filters-form"),
    input: document.querySelector(".filters-input"),
    submitBtn: document.querySelector(".filters-btn"),
    selectBtn: document.querySelector(".filters-select"),
    selectDropdown: document.querySelector(".filters-options"),
    selectedCategory: document.querySelector(".filters-select-input"),
    selectOptions: document.querySelectorAll(".filters-option"),
    productCard: document.querySelector(".product-list"),
    selectList: document.querySelector(".filters-options-list")
}

import {
    getServerProductsCategories,
    getServerProducts
} from "./fetchProducts.js";

import { createMarkup } from "./createMarkup.js";

import { save, load } from "./storage.js";

async function filterCategories () {
    await getServerProductsCategories().then(data => {
        const strCategories = data.map(el => {
            let newEl = el.replace(/_/g, " ");
            if (newEl === "Breads & Bakery") {
                newEl = newEl.replace(/&/g, "/")
            }
            return `<li class="filters-option" data-value="${el}">${newEl}</li>`
        }).join("");
        const str = strCategories + `<li class="filters-option" data-value="null">Show all</li>`
        refs.selectList.insertAdjacentHTML("beforeend", str);

        refs.selectBtn.addEventListener("click", e => {
            e.stopPropagation();
            refs.selectDropdown.classList.toggle("filters-visually-hidden");
        })

        refs.selectList.addEventListener("click", e => {
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
    const {keyword, category, page, limit} = load("filtersOfProducts");

    getServerProducts(page, keyword, category, limit).then(({ results }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
    })

    refs.form.addEventListener("submit", onSubmit);
}

function onSubmit (event) {
    event.preventDefault();
    refs.submitBtn.disabled = true;

    let limit;

    if (window.innerWidth >= 1440) {
        limit = 9;
    } else if (window.innerWidth >= 768) {
        limit = 8;
    } else {
        limit = 6;
    }

    const keyword = refs.input.value || null;
    const category = refs.selectedCategory.value || null;
    getServerProducts(1, keyword, category, limit).then(({ results, totalPages, page }) => {
        if (totalPages === 0) {
            const str =
            `<li class="products-not-found">
                <h3 class="products-heading">Nothing was found for the selected <span class="products-heading-accent">filters...</span></h3>
                <p class="products-text">Try adjusting your search parameters or browse our range by other criteria to find the perfect product for you.</p>
            </li>`;
            refs.productCard.innerHTML = str;
            refs.productCard.classList.add("product-list-not-found");
            refs.form.reset();
            refs.selectBtn.textContent = "Categories";
            refs.submitBtn.disabled = false;
            return
        }
        refs.productCard.classList.remove("product-list-not-found");
        save("filtersOfProducts", { keyword, category, page, limit });
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
        refs.form.reset();
        refs.selectBtn.textContent = "Categories";
        refs.submitBtn.disabled = false;
    })
}

export {
    filterCategories,
    filterProducts
}