import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import axios from "./axios";

export function validateSuccess(word) {
  const wordscore = {
    word: word.word,
    score: word.score,
  };
  return { type: types.WORD_SUCCESS, wordscore };
}

export function restartGame() {
  return { type: types.GAME_RESTART };
}

export function validate(word) {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const response = await axios.post("validate", {
        word: word,
      });
      if (response.data.valid) {
        dispatch(validateSuccess(response.data));
      } else {
        let message = response.data.message;
        dispatch(apiCallError(message));
        return response.data;
      }
    } catch (error) {
      dispatch(apiCallError(error));
      throw error.response.data;
    }
  };
}

export function submitScore() {
  return async function (dispatch, getState) {
    dispatch(beginApiCall());
    try {
      const score = getState().words.reduce(
        (total, obj) => obj.score + total,
        0
      );
      const response = await axios.post("scores", {
        score: score,
      });
      return { message: response.data.message, score };
    } catch (error) {
      dispatch(apiCallError(error));
      throw error.response.data;
    }
  };
}

export function replayGame() {
  return async function (dispatch) {
    dispatch(restartGame());
  };
}
