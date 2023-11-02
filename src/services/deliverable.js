import { API_URL } from "../config";
import { authHeader, handleResponse } from "./helper";

export const createDeliverable = async (activity_id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/deliverable/create/${activity_id}`);
  return handleResponse(await fetch(url, requestOptions));
};

export const getDeliverablesByTeam = async (team_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/deliverable/getByTeamId/${team_id}`);
  return handleResponse(await fetch(url, requestOptions));
};

export const getDeliverableById = async (deliverable_id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const url = new URL(`${API_URL}/deliverable/${deliverable_id}`);
  return handleResponse(await fetch(url, requestOptions));
};

export const evaluate = async (deliverable_id, evaluation) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(evaluation),
  };
  const url = new URL(`${API_URL}/deliverable/evaluate/${deliverable_id}`);
  return handleResponse(await fetch(url, requestOptions));
};
