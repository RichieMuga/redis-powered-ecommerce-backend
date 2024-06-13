import axios from "axios";

export async function fetchUserCart(userId: string) {
  const response = await axios.get(
    `https://fakestoreapi.com/carts/user/${userId}`,
  );
  return response.data;
}

export async function updateCartById(cartId: string, cartData: object) {
  const response = await axios.get(
    `https://fakestoreapi.com/carts/${cartId}`,
    cartData,
  );
  return response.data;
}

export const deleteCartById = async (id: string) => {
  const response = await axios.delete(
    `https://fakestoreapi.com/products/${id}`,
  );
  return response.data;
};

export const addNewCart = async (newData: any) => {
  const response = await axios.post(
    "https://fakestoreapi.com/products",
    newData,
  );
  return response.data;
};
