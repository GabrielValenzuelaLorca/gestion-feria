import { handleResponse } from "./helper";

const API_URL = process.env.REACT_APP_API_URL;

export const createUser = async (user) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  };
  const url = new URL(`${API_URL}/user/register`);
  return handleResponse(await fetch(url, requestOptions));
};