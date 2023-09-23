import { API_URL } from "../config";
import { authHeader, handleResponse } from "./helper";

export const createActivity = async (activity) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(activity),
  };
  const url = new URL(`${API_URL}/activity/create`);
  return handleResponse(await fetch(url, requestOptions));
};

export const editActivity = async (activity) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(activity),
  };
  const url = new URL(`${API_URL}/activity/edit`);
  return handleResponse(await fetch(url, requestOptions));
};

export const getActivities = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/activity`);
  return handleResponse(await fetch(url, requestOptions));
};

export const getActivity = async (activityId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/activity/${activityId}`);
  return handleResponse(await fetch(url, requestOptions));
};
