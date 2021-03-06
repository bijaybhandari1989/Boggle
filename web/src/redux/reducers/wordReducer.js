import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function wordReducer(state = initialState.words, action) {
  switch (action.type) {
    case types.WORD_SUCCESS:
      return [...state, { ...action.wordscore }];
    case types.GAME_RESTART:
      return [];
    default:
      return state;
  }
}
