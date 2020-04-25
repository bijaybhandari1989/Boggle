import authReducer from "./authReducer";
import * as actions from "../actions/authActions";

it("should add token when passed LOGIN_SUCCESS", () => {
  // arrange
  const initialState = {};

  const auth = {
    auth_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODc4OTQ5OTZ9.UcLLZFjhbV6pdL9x4v-GNl_nsWBo0j9XYKRIrsYkZMM",
    high_score: 14,
  };

  const action = actions.loginSuccess(auth);

  // act
  const newState = authReducer(initialState, action);

  // assert
  expect(newState.high_score).toEqual(14);
  expect(newState.auth_token).toEqual(
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODc4OTQ5OTZ9.UcLLZFjhbV6pdL9x4v-GNl_nsWBo0j9XYKRIrsYkZMM"
  );
});

it("should remove token when passed LOGOUT", () => {
  // arrange
  const initialState = {
    auth_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODc4OTQ5OTZ9.UcLLZFjhbV6pdL9x4v-GNl_nsWBo0j9XYKRIrsYkZMM",
    high_score: 14,
  };

  const action = actions.logoutSuccess();

  // act
  const newState = authReducer(initialState, action);

  // assert
  expect(newState.auth_token).toEqual("");
});
