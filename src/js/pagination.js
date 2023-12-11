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
                btn.classList.add("pagination-btn-active")
            }
        })
        const btns = document.querySelectorAll(".pagination-btn");
        refs.pagination.classList.remove("filters-visually-hidden");


        refs.paginationBtnIncr.addEventListener("click", e => {
            let currentPage;
            btns.forEach((btn) => {
                if (btn.classList.contains("pagination-btn-active")) { 
                    currentPage = Number(btn.textContent);
                }
            })
            if ((currentPage + 1) === paginationPages) {
                refs.paginationBtnIncr.disabled = true;
                refs.paginationBtnDecr.disabled = false;
            } else {
                refs.paginationBtnIncr.disabled = false;
                refs.paginationBtnDecr.disabled = false;
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
            if ((currentPage - 1) === 1) {
                refs.paginationBtnIncr.disabled = false;
                refs.paginationBtnDecr.disabled = true;
            } else {
                refs.paginationBtnIncr.disabled = false;
                refs.paginationBtnDecr.disabled = false;
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
            if ((currentPage + 1) === paginationPages) {
                refs.paginationBtnIncr.disabled = true;
                refs.paginationBtnDecr.disabled = false;
            } else {
                refs.paginationBtnIncr.disabled = false;
                refs.paginationBtnDecr.disabled = false;
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
            if ((currentPage - 1) === 1) {
                refs.paginationBtnIncr.disabled = false;
                refs.paginationBtnDecr.disabled = true;
            } else {
                refs.paginationBtnIncr.disabled = false;
                refs.paginationBtnDecr.disabled = false;
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
