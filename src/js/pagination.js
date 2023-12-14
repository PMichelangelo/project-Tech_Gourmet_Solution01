const refs = {
    productCard: document.querySelector(".product-list"),
    pagination: document.querySelector(".products-pagination"),
    paginationBtnList: document.querySelector(".pagination-btn-list"),
    paginationBtnIncr: document.querySelector(".pagination-btn-increment"),
    paginationBtnDecr: document.querySelector(".pagination-btn-decrement"),
}


import { createMarkup } from "./createMarkup.js";
import { save, load } from "./storage.js";
import { getLimit, getServerProducts } from "./fetchProducts.js";
import { checkIsItemInCart } from "./createMarkup.js";


function createMarkupEllipsisOnce(amountOfPages) {
    return `<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">1</button></li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">2</button></li>
    <li class="ellipsis">...</li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${amountOfPages - 1}</button></li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${amountOfPages}</button></li>`
}

function createMarkupEllipsisTwice(selectedPage, amountOfPages) {
    return `<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">1</button></li>
    <li class="ellipsis">...</li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn pag-middle-btn">${selectedPage}</button></li>
    <li class="ellipsis">...</li>
    <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${amountOfPages}</button></li>`
}

function one(paginationPages, e) {
    e.currentTarget.disabled = true;
    let currentPage;
    document.querySelectorAll(".pagination-btn").forEach((btn) => {
        if (btn.classList.contains("pagination-btn-active")) {
            currentPage = Number(btn.textContent);
        }
    })
    let { keyword, category } = load("filtersOfProducts");
    let limit = getLimit();
    getServerProducts((currentPage + 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
        refs.pagination.classList.remove("filters-visually-hidden");
        checkIsItemInCart();
        save("filtersOfProducts", { keyword, category, page, limit });
        document.querySelectorAll(".pagination-btn").forEach((btn) => {
            if (btn.classList.contains("pagination-btn-active")) {
                btn.classList.remove("pagination-btn-active");
                btn.disabled = false;
            }
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        if ((currentPage + 1) === paginationPages) {
            refs.paginationBtnIncr.disabled = true;
            refs.paginationBtnDecr.disabled = false;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }
    })
}

function two(e) {
    e.currentTarget.disabled = true;
    let currentPage;
    document.querySelectorAll(".pagination-btn").forEach((btn) => {
        if (btn.classList.contains("pagination-btn-active")) {
            currentPage = Number(btn.textContent);
        }
    })
    let { keyword, category } = load("filtersOfProducts");
    let limit = getLimit();
    getServerProducts((currentPage - 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
        checkIsItemInCart();
        refs.pagination.classList.remove("filters-visually-hidden");
        save("filtersOfProducts", { keyword, category, page, limit });
        document.querySelectorAll(".pagination-btn").forEach((btn) => {
            if (btn.classList.contains("pagination-btn-active")) {
                btn.classList.remove("pagination-btn-active");
                btn.disabled = false;
            }
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        if ((currentPage - 1) === 1) {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = true;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }
    })
}

function three(paginationPages, e) {
    if (!e.target.classList.contains("pagination-btn")) {
        return
    }
    e.target.disabled = true;
    const btnNumber = Number(e.target.textContent);
    let { keyword, category } = load("filtersOfProducts");
    let limit = getLimit();
    getServerProducts(btnNumber, keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
        checkIsItemInCart();
        save("filtersOfProducts", { keyword, category, page, limit });
        document.querySelectorAll(".pagination-btn").forEach((btn) => {
            if (btn.classList.contains("pagination-btn-active")) {
                btn.classList.remove("pagination-btn-active");
                btn.disabled = false;
            }
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        if (btnNumber === 1) {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = true;
        } else if (btnNumber === paginationPages) {
            refs.paginationBtnIncr.disabled = true;
            refs.paginationBtnDecr.disabled = false;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }
    })
}

function four(paginationPages, e) {
    e.currentTarget.disabled = true;
    let currentPage;
    document.querySelectorAll(".pagination-btn").forEach((btn) => {
        if (btn.classList.contains("pagination-btn-active")) {
            currentPage = Number(btn.textContent);
        }
    })
    let { keyword, category } = load("filtersOfProducts");
    let limit = getLimit();
    getServerProducts((currentPage + 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
        checkIsItemInCart();
        refs.pagination.classList.remove("filters-visually-hidden");
        save("filtersOfProducts", { keyword, category, page, limit });
        if (page === 3) {
            refs.paginationBtnList.innerHTML = createMarkupEllipsisTwice(page, paginationPages);
        } else if ((page - 1) === (paginationPages - 2)) {
            refs.paginationBtnList.innerHTML = createMarkupEllipsisOnce(paginationPages);
        } else if (((page - 1) < (paginationPages - 1)) && document.querySelector(".pag-middle-btn")) {
            document.querySelector(".pag-middle-btn").textContent = Number(document.querySelector(".pag-middle-btn").textContent) + 1;
        }
        document.querySelectorAll(".pagination-btn").forEach((btn) => {
            if (btn.classList.contains("pagination-btn-active")) {
                btn.classList.remove("pagination-btn-active");
                btn.disabled = false;
            }
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        if ((currentPage + 1) === paginationPages) {
            refs.paginationBtnIncr.disabled = true;
            refs.paginationBtnDecr.disabled = false;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }
    })
}

function five(paginationPages, e) {
    e.currentTarget.disabled = true;
    let currentPage;
    document.querySelectorAll(".pagination-btn").forEach((btn) => {
        if (btn.classList.contains("pagination-btn-active")) {
            currentPage = Number(btn.textContent);
        }
    })
    let { keyword, category } = load("filtersOfProducts");
    let limit = getLimit();
    getServerProducts((currentPage - 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
        checkIsItemInCart();
        refs.pagination.classList.remove("filters-visually-hidden");
        save("filtersOfProducts", { keyword, category, page, limit });
        if (page === (paginationPages - 2)) {
            refs.paginationBtnList.innerHTML = createMarkupEllipsisTwice(page, paginationPages);
        } else if (page === 2) {
            refs.paginationBtnList.innerHTML = createMarkupEllipsisOnce(paginationPages);
        } else if (page > 2 && document.querySelector(".pag-middle-btn")) {
            document.querySelector(".pag-middle-btn").textContent = Number(document.querySelector(".pag-middle-btn").textContent) - 1;
        }
        document.querySelectorAll(".pagination-btn").forEach((btn) => {
            if (btn.classList.contains("pagination-btn-active")) {
                btn.classList.remove("pagination-btn-active");
                btn.disabled = false;
            }
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        if ((currentPage - 1) === 1) {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = true;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }
    })
}

function six(paginationPages, e) {
    if (!e.target.classList.contains("pagination-btn")) {
        return
    }
    e.target.disabled = true;
    const btnNumber = Number(e.target.textContent);
    let { keyword, category } = load("filtersOfProducts");
    let limit = getLimit();
    getServerProducts(btnNumber, keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
        const markup = createMarkup(results);
        refs.productCard.innerHTML = markup;
        checkIsItemInCart();
        save("filtersOfProducts", { keyword, category, page, limit });
        if ((page === paginationPages || page === 1) && document.querySelector(".pag-middle-btn")) {
            refs.paginationBtnList.innerHTML = createMarkupEllipsisOnce(paginationPages);
        }
        document.querySelectorAll(".pagination-btn").forEach((btn) => {
            if (btn.classList.contains("pagination-btn-active")) {
                btn.classList.remove("pagination-btn-active");
                btn.disabled = false;
            }
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        if (btnNumber === 1) {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = true;
        } else if (btnNumber === paginationPages) {
            refs.paginationBtnIncr.disabled = true;
            refs.paginationBtnDecr.disabled = false;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }
    })
}

let paginationPages;

let boundOne = one.bind(null, paginationPages);
let boundTwo = two.bind(null);
let boundThree = three.bind(null, paginationPages);

let boundFour = four.bind(null, paginationPages);
let boundFive = five.bind(null, paginationPages);
let boundSix = six.bind(null, paginationPages);

function createPagination(totalPages, page, perPage) {
    refs.paginationBtnIncr.removeEventListener("click", boundOne);
    refs.paginationBtnDecr.removeEventListener("click", boundTwo);
    refs.paginationBtnList.removeEventListener("click", boundThree);

    refs.paginationBtnIncr.removeEventListener("click", boundFour);
    refs.paginationBtnDecr.removeEventListener("click", boundFive);
    refs.paginationBtnList.removeEventListener("click", boundSix);

    paginationPages = Math.ceil(totalPages / perPage);

    boundOne = one.bind(null, paginationPages);
    boundTwo = two.bind(null);
    boundThree = three.bind(null, paginationPages);

    boundFour = four.bind(null, paginationPages);
    boundFive = five.bind(null, paginationPages);
    boundSix = six.bind(null, paginationPages);


    if (paginationPages === 1) {
        refs.pagination.classList.add("filters-visually-hidden");
        return
    }

    if (paginationPages <= 4) {
        let paginationMarkup = ``;
        if (page === 1) {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = true;
        } else if (page === paginationPages) {
            refs.paginationBtnIncr.disabled = true;
            refs.paginationBtnDecr.disabled = false;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }
        for (let i = 1; i <= paginationPages; i += 1) {
            paginationMarkup += `<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${i}</button></li>`
        }
        refs.paginationBtnList.innerHTML = paginationMarkup;
        document.querySelectorAll(".pagination-btn").forEach(btn => {
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        refs.pagination.classList.remove("filters-visually-hidden");

        refs.paginationBtnIncr.addEventListener("click", boundOne);
        refs.paginationBtnDecr.addEventListener("click", boundTwo);
        refs.paginationBtnList.addEventListener("click", boundThree);

        return
    }

    if (paginationPages > 4) {
        if (page === 1) {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = true;
        } else if (page === paginationPages) {
            refs.paginationBtnIncr.disabled = true;
            refs.paginationBtnDecr.disabled = false;
        } else {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
        }

        if (page === 1 || page === 2 || page === (paginationPages - 1) || page === paginationPages) {
            refs.paginationBtnList.innerHTML = createMarkupEllipsisOnce(paginationPages);
        } else {
            refs.paginationBtnList.innerHTML = createMarkupEllipsisTwice(page, paginationPages);
        }

        document.querySelectorAll(".pagination-btn").forEach(btn => {
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })
        refs.pagination.classList.remove("filters-visually-hidden");

        refs.paginationBtnIncr.addEventListener("click", boundFour);
        refs.paginationBtnDecr.addEventListener("click", boundFive);
        refs.paginationBtnList.addEventListener("click", boundSix);
    }
}

export { createPagination };