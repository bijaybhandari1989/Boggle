import * as wordActions from "./wordActions";
import * as types from "./actionTypes";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const wordscore = {
  word: "TEST",
  score: 1,
};

const wordValidResponse = {
  valid: true,
  message: "Valid Word",
  word: "TEST",
  score: 1,
};

const header = {
  "content-type": "application/json",
};

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Login Thunk", () => {
    it("should create BEGIN_API_CALL and WORD_SUCCESS when validate", () => {
      fetchMock.mock("*", {
        body: wordValidResponse,
        headers: header,
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.WORD_SUCCESS, wordscore },
      ];

      const store = mockStore({ words: [] });
      return store.dispatch(wordActions.validate("TEST")).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("generateWords Thunk", () => {
    it("should create BEGIN_API_CALL generateWords", () => {
      fetchMock.mock("*", {
        body: ["Z", "R"],
        headers: header,
      });

      const expectedActions = [{ type: types.BEGIN_API_CALL }];

      const store = mockStore({ auth: {} });
      return store.dispatch(wordActions.generateWords()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("validateSuccess action", () => {
  it("should create a WORD_SUCCESS action", () => {
    //arrange
    const expectedAction = {
      type: types.WORD_SUCCESS,
      wordscore,
    };

    //act
    const action = wordActions.validateSuccess(wordscore);

    //assert
    expect(action).toEqual(expectedAction);
  });
});

describe("restartGame action", () => {
  it("should create a GAME_RESTART action", () => {
    //arrange
    const expectedAction = {
      type: types.GAME_RESTART,
    };

    //act
    const action = wordActions.restartGame();

    //assert
    expect(action).toEqual(expectedAction);
  });
});
