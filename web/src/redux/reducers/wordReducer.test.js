import authReducer from "./wordReducer";
import * as actions from "../actions/wordActions";

it("should add new word when passed WORD_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      word: "TEST",
      score: 1,
    },
  ];

  const newWord = {
    word: "REST",
    score: 1,
  };

  const action = actions.validateSuccess(newWord);

  // act
  const newState = authReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(2);
  expect(newState[0].word).toEqual("TEST");
  expect(newState[1].word).toEqual("REST");
});

it("should remove all words when passed GAME_RESTART", () => {
  // arrange
  const initialState = [
    {
      word: "TEST",
      score: 1,
    },
  ];

  const action = actions.restartGame();

  // act
  const newState = authReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(0);
});
