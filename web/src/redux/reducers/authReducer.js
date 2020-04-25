import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authenticationReducer(
  state = initialState.auth,
  action
) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.auth;
    case types.LOGOUT:
      return {
        auth_token: "",
      };
    default:
      return state;
  }
}
