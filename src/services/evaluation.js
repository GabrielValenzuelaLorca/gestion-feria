import { API_URL } from "../config";
import { authHeader, handleResponse } from "./helper";

export const getEvaluationsByActivity = async (activityId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/evaluation/all/${activityId}`);
  return handleResponse(await fetch(url, requestOptions));
};
