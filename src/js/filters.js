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

function onSubmit() {
    refs.productCard.classList.remove("product-list-not-found");
    if (load("filtersOfProducts") === undefined) {
        save("filtersOfProducts", { keyword: null, category: null, page: 1, limit: 6 });
    }
    let keyword = load("filtersOfProducts").keyword;
    let category = load("filtersOfProducts").category;
    getServerProducts(1, keyword, category).then(({ results, totalPages }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
    })
    refs.submitBtn.addEventListener("click", e => {
        e.preventDefault();
        keyword = refs.input.value || null;
        category = refs.selectedCategory.value || null;
        refs.form.reset();
        refs.selectBtn.textContent = "Categories";
        getServerProducts(1, keyword, category).then(({ results, totalPages, page }) => {
            if (totalPages === 0) {
                const str = `<li class="products-not-found">
                    <h3 class="products-heading">Nothing was found for the selected <span class="products-heading-accent">filters...</span></h3>
                    <p class="products-text">Try adjusting your search parameters or browse our range by other criteria to find the perfect product for you.</p>
                </li>`;
                refs.productCard.innerHTML = str;
                refs.productCard.classList.add("product-list-not-found");
                return
            }
            refs.productCard.classList.remove("product-list-not-found");
            save("filtersOfProducts", { keyword, category, page, limit: 6 });
            const markup = createMarkup(results);
            refs.productCard.innerHTML = markup;
        })
    })
}

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

export {
    filterCategories,
    onSubmit
}