import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import axios from "./axios";

export function loginSuccess(auth) {
  return { type: types.LOGIN_SUCCESS, auth };
}

export function login(username, password) {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const auth = await axios.post("auth/login", {
        username: username,
        password: password,
      });
      dispatch(loginSuccess(auth.data));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error.response.data;
    }
  };
}

export function register(user) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    // return courseApi
    //   .saveCourse(course)
    //   .then((user) => {
    //     dispatch(loginSuccess(user));
    //   })
    //   .catch((error) => {
    //     dispatch(apiCallError(error));
    //     throw error;
    //   });
  };
}
