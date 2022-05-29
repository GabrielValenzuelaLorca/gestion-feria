import { API_URL } from "../config";
import { authHeader, handleResponse } from "./helper";

// export const createUser = async (user) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user)
//   };
//   const url = new URL(`${API_URL}/user/register`);
//   return handleResponse(await fetch(url, requestOptions));
// };

export const getActivities = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
  };
  const url = new URL(`${API_URL}/activity`);
  return handleResponse(await fetch(url, requestOptions));
}