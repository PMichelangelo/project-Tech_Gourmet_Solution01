const refs = {
    form: document.querySelector(".filters-form"),
    input: document.querySelector(".filters-input"),
    submitBtn: document.querySelector(".filters-btn"),
    selectBtn: document.querySelector(".filters-select"),
    selectDropdown: document.querySelector(".filters-options"),
    selectedCategory: document.querySelector(".filters-select-input"),
    selectOptions: document.querySelectorAll(".filters-option"),
    productCard: document.querySelector(".product-list")
}

import {
    getServerProductsCategories,
    getServerProducts,
} from "./fetchProducts.js";

import { createMarkup } from "./createMarkup.js";

async function filterCategories () {
    await getServerProductsCategories().then(data => {
        const strCategories = data.map(el => {
            let newEl = el.replace(/_/g, " ");
            if (newEl === "Breads & Bakery") {
                newEl = newEl.replace(/&/g, "/")
            }
            return `<li data-value="${el}" class="filters-option">${newEl}</li>`
        }).join("");
        const str = strCategories + `<li data-value="null" class="filters-option">Show all</li>`
        refs.selectDropdown.insertAdjacentHTML("beforeend", str);

        refs.selectBtn.addEventListener("click", e => {
            e.stopPropagation();
            refs.selectDropdown.classList.toggle("filters-visually-hidden");
        })

        refs.selectDropdown.addEventListener("click", e => {
            refs.selectDropdown.classList.add("filters-visually-hidden");
            const categoryForUser = e.target.textContent;
            const categoryForUs = e.target.dataset.value;
            refs.selectBtn.textContent = categoryForUser;
            refs.selectedCategory.value = categoryForUs;
        })

        document.addEventListener("click", e => refs.selectDropdown.classList.add("filters-visually-hidden"))
    })
}

function onSubmit () {
    refs.submitBtn.addEventListener("click", e => {
        e.preventDefault();
        const keyword = refs.input.value;
        const category = refs.selectedCategory.value;
        refs.form.reset();
        refs.selectBtn.textContent = "Categories";
        getServerProducts(1, keyword, category).then(({ results, totalPages }) => {
            if (totalPages === 0) {
                const str = `<li class="products-not-found">
                    <h3 class="products-heading ${totalPages}">Nothing was found for the selected <span class="products-heading-accent">filters...</span></h3>
                    <p class="products-text">Try adjusting your search parameters or browse our range by other criteria to find the perfect product for you.</p>
                </li>`;
                refs.productCard.innerHTML = str;
                return
            }
            const markup = createMarkup(results);
            refs.productCard.innerHTML = markup;
        })
    })
}

export {
    filterCategories,
    onSubmit
}