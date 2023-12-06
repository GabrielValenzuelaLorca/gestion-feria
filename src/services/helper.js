import store from "../store";

export const handleResponse = async (response) => {
  const text = await response.text();
  let data = {};

  if (!response.ok) {
    const error = text || response.statusText;
    throw error;
  }

  try {
    data = text && JSON.parse(text);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const authHeader = () => {
  const token = store.getState().user.auth_token;
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return null;
};
