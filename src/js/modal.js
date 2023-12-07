// import { getServerProductsById } from "./fetchProducts.js";

const modal = document.querySelector(".modalka");
const openModalBtn = document.getElementById("openModalBtn");

openModalBtn.addEventListener("click", openModal);

async function getServerProductsById(id) {
  const URL = 'https://food-boutique.b.goit.study/api';
  const endPoint = 'products';

  try {
    const result = await axios.get(`${URL}/${endPoint}/${id}`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function openModal(event) {
  const productId = "640c2dd963a319ea671e383b";

  try {
    const productData = await getServerProductsById(productId);
    console.log(productData);


    const instance = basicLightbox.create(`
      <img src="${productData.img}" alt="${productData.name}"> 
      <p>${productData.name}</p>
      <p>${productData.category}</p>
      <p>${productData.size}</p>
      <p>${productData.popularity}</p>
      <p>${productData.desc}</p>
      <p>${productData.price}</p>
      <button>Add to cart</button>
     `);
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
};