import { handleResponse } from "./helper";
import { API_URL } from "../config";

export const getActivePeriod = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = new URL(`${API_URL}/period/active`);
  return handleResponse(await fetch(url, requestOptions));
};
