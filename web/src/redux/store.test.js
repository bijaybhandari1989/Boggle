import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as authActions from "./actions/authActions";
import * as wordActions from "./actions/wordActions";

it("Should handle creating words", function () {
  // arrange
  const store = createStore(rootReducer, initialState);
  const word = {
    word: "TEST",
    score: 1,
  };

  // act
  const action = wordActions.validateSuccess(word);
  store.dispatch(action);

  // assert
  const createdWord = store.getState().words[0];
  expect(createdWord).toEqual(word);
});

it("Should handle remove all words", function () {
  const words = [
    {
      word: "TEST",
      score: 1,
    },
  ];
  // arrange
  initialState.words = words;
  const store = createStore(rootReducer, initialState);

  // act
  const action = wordActions.restartGame();
  store.dispatch(action);

  // assert
  const createdWord = store.getState().words;
  expect(createdWord.length).toEqual(0);
});

it("Should handle creating token", function () {
  // arrange
  const store = createStore(rootReducer, initialState);
  const auth = {
    auth_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODc4OTQ5OTZ9.UcLLZFjhbV6pdL9x4v-GNl_nsWBo0j9XYKRIrsYkZMM",
    high_score: 14,
  };

  // act
  const action = authActions.loginSuccess(auth);
  store.dispatch(action);

  // assert
  const token = store.getState().auth;
  expect(token.auth_token).toEqual(
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODc4OTQ5OTZ9.UcLLZFjhbV6pdL9x4v-GNl_nsWBo0j9XYKRIrsYkZMM"
  );
});

it("Should handle removing token", function () {
  // arrange
  const auth = {
    auth_token:
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODc4OTQ5OTZ9.UcLLZFjhbV6pdL9x4v-GNl_nsWBo0j9XYKRIrsYkZMM",
    high_score: 14,
  };
  initialState.auth = auth;
  const store = createStore(rootReducer, initialState);

  // act
  const action = authActions.logoutSuccess();
  store.dispatch(action);

  // assert
  const token = store.getState().auth;
  expect(token.auth_token).toEqual("");
});
