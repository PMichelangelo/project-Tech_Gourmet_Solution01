const refs = {
    form: document.querySelector(".filters-form"),
    input: document.querySelector(".filters-input"),
    submitBtn: document.querySelector(".filters-btn"),
    selectBtn: document.querySelector(".filters-select"),
    selectDropdown: document.querySelector(".filters-options"),
    selectedCategory: document.querySelector(".filters-select-input"),
    selectOptions: document.querySelectorAll(".filters-option")
}

import {
    getServerProductsCategories,
    getServerProducts,
} from "./fetchProducts.js";

// import { createMarkup } from "./createMarkup.js";

getServerProductsCategories().then(data => {
    const strCategories = data.map(el => {
        let newEl = el.replace(/_/g, " ");
        if (newEl === "Breads & Bakery") {
            newEl = newEl.replace(/&/g, "/")
        }
        return `<li data-value="${el}" class="filters-option">${newEl}</li>`
    }).join("");
    const str = strCategories + `<li class="filters-option">Show all</li>`
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



refs.submitBtn.addEventListener("click", e => {
    e.preventDefault();
    const keyword = refs.input.value;
    const category = refs.selectedCategory.value;
    refs.form.reset();
    refs.selectBtn.textContent = "Categories";
    const arrayOfProducts = getServerProducts(1, keyword, category);
    // const markup = createMarkup(arrayOfProducts);
    // .insertAdjacentHTML("beforeend", markup);
})