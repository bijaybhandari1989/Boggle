import * as authActions from "./authActions";
import * as types from "./actionTypes";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const auth = {
  auth_token:
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1ODc5MTAyNzZ9.IxuB5aGej8zKTddzFp2lkjtfzt7p7zKtcitu5AoGNLY",
  high_score: 0,
};

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Login Thunk", () => {
    it("should create BEGIN_API_CALL and LOGIN_SUCCESS when login", () => {
      fetchMock.mock("*", {
        body: auth,
        headers: { "content-type": "application/json" },
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOGIN_SUCCESS, auth },
      ];

      const store = mockStore({ auth: {} });
      return store
        .dispatch(authActions.login("test@test.com", "test"))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe("Register Thunk", () => {
    it("should create BEGIN_API_CALL and LOGIN_SUCCESS when register", () => {
      fetchMock.mock("*", {
        body: auth,
        headers: { "content-type": "application/json" },
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOGIN_SUCCESS, auth },
      ];

      const store = mockStore({ auth: {} });
      return store.dispatch(authActions.register({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("loginSuccess action", () => {
  it("should create a LOGIN_SUCCESS action", () => {
    //arrange
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      auth,
    };

    //act
    const action = authActions.loginSuccess(auth);

    //assert
    expect(action).toEqual(expectedAction);
  });
});

describe("logoutSuccess action", () => {
  it("should create a LOGOUT action", () => {
    //arrange
    const expectedAction = {
      type: types.LOGOUT,
    };

    //act
    const action = authActions.logoutSuccess();

    //assert
    expect(action).toEqual(expectedAction);
  });
});
