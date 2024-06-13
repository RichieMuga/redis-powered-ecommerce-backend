import axios from "axios";
import { filterUserUpdateData } from "./filter/filter.service";

export async function fetchUserData(userId: string) {
  const response = await axios.get(`https://fakestoreapi.com/users/${userId}`)
  return response.data
}

export async function deleteUserById(userId: string) {
  const response = await axios.delete(`https://fakestoreapi.com/users/${userId}`)
  return response.data
}

export async function updateUserById(id: string, updateData: object) {
  const filteredData = filterUserUpdateData(updateData);
  const response = await axios.patch(`https://fakestoreapi.com/users/${id}`, filteredData);
  return response.data;
};

export async function addNewUser(userData: object) {
  const response = await axios.post('https://fakestoreapi.com/users', userData);
  return response.data;
};
