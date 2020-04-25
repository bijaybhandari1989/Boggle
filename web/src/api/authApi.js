import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export async function login(req) {
  try {
    let res = await fetch(baseUrl + "auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req),
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
}

export async function register(req) {
  try {
    let res = await fetch(baseUrl + "signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req),
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
}
