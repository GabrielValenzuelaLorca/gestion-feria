import { API_URL } from "../config";
import { authHeader, handleResponse } from "./helper";

export const getDeliverablesByActivity = async (activityId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/deliverable/getByActivity/${activityId}`);
  return handleResponse(await fetch(url, requestOptions));
};
