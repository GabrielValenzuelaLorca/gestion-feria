import { API_URL } from "../config";
import { authHeader, handleResponse } from "./helper";

export const createRubric = async (activityId, rubric) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(rubric),
  };
  const url = new URL(`${API_URL}/rubric/create/${activityId}`);
  return handleResponse(await fetch(url, requestOptions));
};
