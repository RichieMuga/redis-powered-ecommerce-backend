import axios from 'axios';

export const fetchAllCategories = async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
};

export const fetchProductsInSpecificCategory = async (categoryName:string) => {
  const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`)
  return response.data
}
