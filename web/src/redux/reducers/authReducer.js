import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authenticationReducer(
  state = initialState.auth,
  action
) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.auth;
    case types.LOGIN_FAILURE:
      return {};
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
}
