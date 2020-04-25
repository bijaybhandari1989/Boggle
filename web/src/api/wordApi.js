import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

let headers = { "content-type": "application/json" };
let auth = JSON.parse(localStorage.getItem("currentUser"));
if (auth && auth.auth_token.length > 0) {
  headers = {
    "content-type": "application/json",
    Authorization: "Bearer " + auth.auth_token,
  };
}

export async function validate(req) {
  try {
    let res = await fetch(baseUrl + "validate", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req),
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
}

export async function scores(req) {
  try {
    let res = await fetch(baseUrl + "scores", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(req),
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
}

export async function generateWords() {
  try {
    let res = await fetch(baseUrl + "generate", {
      method: "GET",
      headers: headers,
    });
    return handleResponse(res);
  } catch (error) {
    return handleError(error);
  }
}
