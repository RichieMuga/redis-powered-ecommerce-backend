import axios from "axios";

export async function fetchUserData(userId:string){
  const response = await axios.get(`https://fakestoreapi.com/users/${userId}`)
  return response.data
}
