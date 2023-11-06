import { API_URL } from "../config";
import { authHeader, handleResponse } from "./helper";

export const createStory = async (story) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(story),
  };
  const url = new URL(`${API_URL}/story/create`);
  return handleResponse(await fetch(url, requestOptions));
};
