import { authHeader, handleResponse } from "./helper";
import { API_URL } from "../config";

export const updateProject = async (project) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(project),
  };
  const url = new URL(`${API_URL}/project/update`);
  return handleResponse(await fetch(url, requestOptions));
};
