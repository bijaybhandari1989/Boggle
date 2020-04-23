import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import axios from "./axios";

export function loginSuccess(auth) {
  return { type: types.LOGIN_SUCCESS, auth };
}
export function logoutSuccess() {
  return { type: types.LOGOUT };
}

export function login(username, password) {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const auth = await axios.post("auth/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("currentUser", JSON.stringify(auth.data));
      dispatch(loginSuccess(auth.data));
    } catch (error) {
      localStorage.removeItem("currentUser");
      dispatch(apiCallError(error));
      throw error.response.data;
    }
  };
}

export function logout() {
  return async function (dispatch) {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ auth_token: "", high_score: 0 })
    );
    dispatch(logoutSuccess());
  };
}

export function register(user) {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const auth = await axios.post("signup", user);
      localStorage.setItem("currentUser", JSON.stringify(auth.data));
      dispatch(loginSuccess(auth.data));
    } catch (error) {
      localStorage.removeItem("currentUser");
      dispatch(apiCallError(error));
      throw error.response.data;
    }
  };
}
