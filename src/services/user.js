import { authHeader, handleResponse } from "./helper";

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

export const login = async (credentials) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  };
  const url = new URL(`${API_URL}/user/login`);
  return handleResponse(await fetch(url, requestOptions));
}

export const getUsers = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/user/all`);
  return handleResponse(await fetch(url, requestOptions));
}