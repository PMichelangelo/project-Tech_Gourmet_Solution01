import axios from 'axios';

export {
  getServerProductsCategories,
  getServerProductsDiscount,
  getServerProductsPopular,
  getServerProductsById,
  getServerProducts,
};
async function getServerProductsCategories() {
  const URL = 'https://food-boutique.b.goit.study/api';
  const endPoint = 'products/categories';
  try {
    const result = await axios.get(`${URL}/${endPoint}`);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
}
async function getServerProductsDiscount() {
  const URL = 'https://food-boutique.b.goit.study/api';
  const endPoint = 'products/discount';

  try {
    const result = await axios.get(`${URL}/${endPoint}`);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getServerProductsPopular() {
  const URL = 'https://food-boutique.b.goit.study/api';
  const endPoint = 'products';

  try {
    const result = await axios.get(`${URL}/${endPoint}`);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
}
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
async function getServerProducts(page, key, category, limit) {
  const array = await getServerProductsCategories();
  const URL = 'https://food-boutique.b.goit.study/api';
  const endPoint = 'products';

  if (key !== undefined && key !== null && array.includes(category)) {
    const params = new URLSearchParams({
      page: page,
      limit: limit,
      keyword: key,
      category: category,
    });
    try {
      const result = await axios.get(`${URL}/${endPoint}?${params}`);
      console.log(1);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  if (key !== undefined && key !== null) {
    const params = new URLSearchParams({
      page: page,
      limit: limit,
      keyword: key,
    });
    try {
      const result = await axios.get(`${URL}/${endPoint}?${params}`);
      console.log(2);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  } else if (array.includes(category)) {
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
        category: category,
      });
      const result = await axios.get(`${URL}/${endPoint}?${params}`);
      console.log(3);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  } else {
    try {
      const params = new URLSearchParams({
        page: page,
        limit: limit,
      });
      const result = await axios.get(`${URL}/${endPoint}?${params}`);
      console.log(4);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
