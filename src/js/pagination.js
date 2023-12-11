const refs = {
    productCard: document.querySelector(".product-list"),
    pagination: document.querySelector(".products-pagination"),
    paginationBtnList: document.querySelector(".pagination-btn-list"),
    paginationBtnIncr: document.querySelector(".pagination-btn-increment"),
    paginationBtnDecr: document.querySelector(".pagination-btn-decrement"),
}

export { createPaginationMarkup };

import { createMarkup } from "./createMarkup.js";

import { save, load } from "./storage.js";

import { getServerProducts } from "./fetchProducts.js";

function createPaginationMarkup(totalPages, page, perPage, limit, keyword, category) {
    const paginationPages = Math.ceil(totalPages / perPage);
    console.log("paginationPages:", paginationPages);

    if (paginationPages === 1) {
        refs.pagination.classList.add("filters-visually-hidden");
        return
    }

    if (paginationPages <= 4) {
        let paginationMarkup = ``;
        for (let i = 1; i <= paginationPages; i += 1) {
            paginationMarkup += `<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${i}</button></li>`
        }
        refs.paginationBtnList.innerHTML = paginationMarkup;
        document.querySelectorAll(".pagination-btn").forEach(btn => {
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active")
            }
        })
        const btns = document.querySelectorAll(".pagination-btn");
        refs.pagination.classList.remove("filters-visually-hidden");
        refs.paginationBtnIncr.addEventListener("click", e => {
            refs.paginationBtnIncr.disabled = false;
            refs.paginationBtnDecr.disabled = false;
            let currentPage;
            btns.forEach((btn) => {
                if (btn.classList.contains("pagination-btn-active")) { 
                    currentPage = Number(btn.textContent);
                }
            })
            if (currentPage === paginationPages) {
                refs.paginationBtnIncr.disabled = true;
                console.log("no")
                return
            } else {
                refs.paginationBtnIncr.disabled = false;
                console.log("yes")
            }
            getServerProducts((currentPage + 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
                const markup = createMarkup(results);
                refs.productCard.innerHTML = markup;
                refs.pagination.classList.remove("filters-visually-hidden");
                console.log(results, totalPages, page, perPage);
                btns.forEach((btn) => {
                    if (btn.classList.contains("pagination-btn-active")) {
                        btn.classList.remove("pagination-btn-active");
                        btn.disabled = false;
                    }
                    if (Number(btn.textContent) === page) {
                        btn.classList.add("pagination-btn-active");
                        btn.disabled = true;
                    }
                })
            })
        })
        refs.paginationBtnDecr.addEventListener("click", e => {
            let currentPage;
            btns.forEach((btn) => {
                if (btn.classList.contains("pagination-btn-active")) { 
                    currentPage = Number(btn.textContent);
                }
            })
            if (currentPage === 1) {
                refs.paginationBtnDecr.disabled = true;
                refs.paginationBtnIncr.disabled = false;
                console.log("no")
                return
            } else {
                refs.paginationBtnDecr.disabled = false;
                console.log("yes")
            }
            getServerProducts((currentPage - 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
                const markup = createMarkup(results);
                refs.productCard.innerHTML = markup;
                refs.pagination.classList.remove("filters-visually-hidden");
                console.log(results, totalPages, page, perPage);
                btns.forEach((btn) => {
                    if (btn.classList.contains("pagination-btn-active")) {
                        btn.classList.remove("pagination-btn-active");
                        btn.disabled = false;
                    }
                    if (Number(btn.textContent) === page) {
                        btn.classList.add("pagination-btn-active");
                        btn.disabled = true;
                    }
                })
            })
        })
        refs.paginationBtnList.addEventListener("click", e => {
            if (!e.target.classList.contains("pagination-btn")) {
                return
            }
            const btnNumber = Number(e.target.textContent);
            getServerProducts(btnNumber, keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
                const markup = createMarkup(results);
                refs.productCard.innerHTML = markup;
                console.log(results, totalPages, page, perPage);
                btns.forEach((btn) => {
                    if (btn.classList.contains("pagination-btn-active")) {
                        btn.classList.remove("pagination-btn-active");
                        btn.disabled = false;
                    }
                    if (Number(btn.textContent) === page) {
                        btn.classList.add("pagination-btn-active");
                        btn.disabled = true;
                    }
                })
            })
        })
        return
    }

    if (paginationPages > 4) {
        const paginationMarkup =
            `<li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">1</button></li>
            <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">2</button></li>
            <div class="ellipsis">...</div>
            <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${paginationPages - 1}</button></li>
            <li class="pagination-btn-item"><button type="button" class="pag-btn-common pagination-btn">${paginationPages}</button></li>`;
        refs.paginationBtnList.innerHTML = paginationMarkup;
        const btns = document.querySelectorAll(".pagination-btn");
        btns.forEach(btn => {
            if (Number(btn.textContent) === page) {
                btn.classList.add("pagination-btn-active");
                btn.disabled = true;
            }
        })

        refs.paginationBtnIncr.addEventListener("click", e => {
            let currentPage;
            btns.forEach((btn) => {
                if (btn.classList.contains("pagination-btn-active")) { 
                    currentPage = Number(btn.textContent);
                }
            })
            if (currentPage === paginationPages) {
                refs.paginationBtnIncr.disabled = true;
                refs.paginationBtnDecr.disabled = false;
                console.log("no")
                return
            } else {
                refs.paginationBtnIncr.disabled = false;
                console.log("yes")
            }
            getServerProducts((currentPage + 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
                const markup = createMarkup(results);
                refs.productCard.innerHTML = markup;
                refs.pagination.classList.remove("filters-visually-hidden");
                console.log(results, totalPages, page, perPage);
                btns.forEach((btn) => {
                    if (btn.classList.contains("pagination-btn-active")) {
                        btn.classList.remove("pagination-btn-active");
                        btn.disabled = false;
                    }
                    if (Number(btn.textContent) === page) {
                        btn.classList.add("pagination-btn-active");
                        btn.disabled = true;
                    }
                })
            })
        })
        refs.paginationBtnDecr.addEventListener("click", e => {
            let currentPage;
            btns.forEach((btn) => {
                if (btn.classList.contains("pagination-btn-active")) { 
                    currentPage = Number(btn.textContent);
                }
            })
            if (currentPage === 1) {
                refs.paginationBtnDecr.disabled = true;
                refs.paginationBtnIncr.disabled = false;
                console.log("no")
                return
            } else {
                refs.paginationBtnDecr.disabled = false;
                console.log("yes")
            }
            getServerProducts((currentPage - 1), keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
                const markup = createMarkup(results);
                refs.productCard.innerHTML = markup;
                refs.pagination.classList.remove("filters-visually-hidden");
                console.log(results, totalPages, page, perPage);
                btns.forEach((btn) => {
                    if (btn.classList.contains("pagination-btn-active")) {
                        btn.classList.remove("pagination-btn-active");
                        btn.disabled = false;
                    }
                    if (Number(btn.textContent) === page) {
                        btn.classList.add("pagination-btn-active");
                        btn.disabled = true;
                    }
                })
            })
        })
        refs.paginationBtnList.addEventListener("click", e => {
            if (!e.target.classList.contains("pagination-btn")) {
                return
            }
            const btnNumber = Number(e.target.textContent);
            getServerProducts(btnNumber, keyword, category, limit).then(({ results, totalPages, page, perPage }) => {
                const markup = createMarkup(results);
                refs.productCard.innerHTML = markup;
                console.log(results, totalPages, page, perPage);
                btns.forEach((btn) => {
                    if (btn.classList.contains("pagination-btn-active")) {
                        btn.classList.remove("pagination-btn-active");
                        btn.disabled = false;
                    }
                    if (Number(btn.textContent) === page) {
                        btn.classList.add("pagination-btn-active");
                        btn.disabled = true;
                    }
                })
            })
        })
        refs.pagination.classList.remove("filters-visually-hidden");
    }
}
