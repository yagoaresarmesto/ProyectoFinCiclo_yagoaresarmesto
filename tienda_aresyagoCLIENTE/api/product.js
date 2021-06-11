import { BASE_PATH } from "../utils/constants";

export async function getLastProductsApi(limit) {
  try {
    const limitItems = `_limit=${limit}`; //Limitar items
    const sortItem = "_sort=createdAt:desc"; //Ordenamos por fecha en descendente
    const url = `${BASE_PATH}/products?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function getProductCategoryApi(category, limit, start) { //Coger los porductos por categoría
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/products?category.url=${category}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalProductsCategoryApi(product) {
  try {
    const url = `${BASE_PATH}/products/count?category.url=${product}`; //Contar todos lo productos de la plataforma
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/products?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchProductsApi(title) {
  try {
    const url = `${BASE_PATH}/products?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}