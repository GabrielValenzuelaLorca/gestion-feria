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

export const getStoriesBySprint = async (sprint, teamId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/story/getStoriesBySprint`);
  if (sprint) url.searchParams.append("sprint", sprint);
  url.searchParams.append("teamId", teamId);
  return handleResponse(await fetch(url, requestOptions));
};

export const updateStoriesState = async (params) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(params),
  };
  const url = new URL(`${API_URL}/story/updateState`);
  return handleResponse(await fetch(url, requestOptions));
};

export const updateStory = async (story) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(story),
  };
  const url = new URL(`${API_URL}/story/update/${story.id}`);
  return handleResponse(await fetch(url, requestOptions));
};
