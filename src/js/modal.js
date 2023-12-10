import { getServerProductsById } from "./fetchProducts.js";
import * as basicLightbox from "basiclightbox";

export {
  openModal
};


async function openModal(productId) {
  try {
    const productData = await getServerProductsById(productId);

    const modalContent = document.createElement("div");

    modalContent.innerHTML = `
    <div class ="modal-test" ><img src="${productData.img}" alt="${productData.name}">
      <p>${productData.name}</p>
      <p>${productData.category}</p>
      <p>${productData.size}</p>
      <p>${productData.popularity}</p>
      <p>${productData.desc}</p>
      <p>${productData.price}</p>
      <button>Add to cart</button></div>

    `;

    const instance = basicLightbox.create(modalContent);

    instance.show();

    const closeModal = (event) => {
      if (event.key === "Escape") {
        instance.close();
        document.removeEventListener("keydown", closeModal);
      }
    };

    document.addEventListener("keydown", closeModal);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}