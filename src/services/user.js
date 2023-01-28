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
};

export const getUsers = async (params = {}) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/user/all`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return handleResponse(await fetch(url, requestOptions));
};

export const updateUser = async (params) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(params),
  };
  const url = new URL(`${API_URL}/user/update`);
  return handleResponse(await fetch(url, requestOptions));
};