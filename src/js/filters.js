import {
    getServerProductsCategories,
    getServerProducts,
    getLimit
} from "./fetchProducts.js";
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
    selectList: document.querySelector(".filters-options-list"),
    pagination: document.querySelector(".products-pagination"),
    sortingBtn: document.querySelector(".filters-sorting"),
    sortingDropdown: document.querySelector(".sorting-options-list"),
    selectedSorting: document.querySelector(".filters-sorting-input"),
}



async function filterCategories () {
    await getServerProductsCategories().then(data => {
        const strCategories = data.map(el => {
            const newEl = makeCategory(el);
            return `<li class="filters-option" data-value="${el}">${newEl}</li>`
        }).join("");
        const str = strCategories + `<li class="filters-option" data-value="null">Show all</li>`
        refs.selectList.insertAdjacentHTML("beforeend", str);

        refs.selectBtn.addEventListener("click", e => {
            e.stopPropagation();
            refs.selectDropdown.classList.toggle("filters-visually-hidden");
        })

        refs.sortingBtn.addEventListener("click", e => {
            e.stopPropagation();
            refs.sortingDropdown.classList.toggle("filters-visually-hidden");
        })

        refs.selectList.addEventListener("click", e => {
            const categoryForUser = e.target.textContent;
            const categoryForUs = e.target.dataset.value;
            refs.selectBtn.textContent = categoryForUser;
            refs.selectedCategory.value = categoryForUs;
        })

        refs.sortingDropdown.addEventListener("click", e => {
            const sortingName = e.target.textContent;
            const sortingForUs = e.target.dataset.sort;
            refs.sortingBtn.textContent = sortingName;
            refs.selectedSorting.value = sortingForUs;
        })

        document.addEventListener("click", e => {
            refs.selectDropdown.classList.add("filters-visually-hidden");
            refs.sortingDropdown.classList.add("filters-visually-hidden");
        })
    })
}

function filterProducts() {
    refs.productCard.classList.remove("product-list-not-found");
    if (load("filtersOfProducts") === undefined) {
        save("filtersOfProducts", { keyword: null, category: null, page: 1, limit: 6, sorting: "byABC1"});
    }
    let { keyword, category, page, sorting } = load("filtersOfProducts");
    let limit = getLimit();
    if (category !== "null") {
        refs.selectBtn.textContent = makeCategory(category)
    }
    refs.input.value = keyword;
    refs.selectedCategory.value = category;
    refs.selectedSorting.value = sorting;
    getServerProducts(page, keyword, category, limit, sorting).then(({ results, totalPages, page, perPage }) => {
        const maxPage = Math.ceil(totalPages / perPage);
        if (maxPage < page) {
            getServerProducts(maxPage, keyword, category, limit, sorting).then(({ results, totalPages, page, perPage }) => {
                refs.productCard.innerHTML = createMarkup(results);
                createPagination(totalPages, page, perPage);
                checkIsItemInCart();
            })
        } else {
            refs.productCard.innerHTML = createMarkup(results);
            createPagination(totalPages, page, perPage);
            checkIsItemInCart();
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
    const sorting = refs.selectedSorting.value
    getServerProducts(1, keyword, category, limit, sorting).then(({ results, totalPages, page, perPage }) => {
        if (totalPages === 0) {
            const str =
            `<li class="products-not-found">
                <h3 class="products-heading">Nothing was found for the selected <span class="products-heading-accent">filters...</span></h3>
                <p class="products-text">Try adjusting your search parameters or browse our range by other criteria to find the perfect product for you.</p>
            </li>`;
            refs.productCard.innerHTML = str;
            refs.pagination.classList.add("filters-visually-hidden");
            refs.productCard.classList.add("product-list-not-found");
            // refs.selectBtn.textContent = "Categories";
            refs.submitBtn.disabled = false;
            return
        }
        refs.productCard.classList.remove("product-list-not-found");
        refs.productCard.innerHTML = createMarkup(results);
        save("filtersOfProducts", { keyword, category, page: 1, limit, sorting });
        createPagination(totalPages, page, perPage);
        refs.submitBtn.disabled = false;
    })
}

function makeCategory(categoryFromServer) {
    let categoryforUser = categoryFromServer.replace(/_/g, " ");
    if (categoryforUser === "Breads & Bakery") {
        categoryforUser = categoryforUser.replace(/&/g, "/")
    }
    return categoryforUser
}

export {
    filterCategories,
    filterProducts
}
