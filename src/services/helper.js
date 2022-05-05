export const handleResponse = async (response) => {
  const text = await response.text();
  let data = {};

  try {
    data = text && JSON.parse(text);
  } catch (error) {
    console.log(error);
  }

  if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
};

export const authHeader = () => {
  const token = JSON.parse(window.sessionStorage.getItem('user'));
  if (token) {
    return {
      Authorization: `Bearer ${token.auth_token}`
    }
  }

  return null;
};