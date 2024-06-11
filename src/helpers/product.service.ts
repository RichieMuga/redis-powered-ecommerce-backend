import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

export const fetchProductsById = async (id: string) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
  return response.data
}

export const updateProductById = async (id: string, updateData: object) => {
  const response = await axios.patch(`https://fakestoreapi.com/products/${id}`, updateData)
  return response.data
}

export const deleteProductById = async (id: string) => {
  const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};

export const addNewProduct = async (newData:object) => {
  const response = await axios.post("https://fakestoreapi.com/products", newData)
  return response.data;
}
