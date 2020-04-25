import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as wordApi from "../../api/wordApi";

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
      const response = await wordApi.validate({
        word: word,
      });
      if (response.valid) {
        dispatch(validateSuccess(response));
      } else {
        let message = response.message;
        dispatch(apiCallError(message));
        return response;
      }
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
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
      const response = await wordApi.scores({
        score: score,
      });
      return { message: response.message, score };
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function generateWords() {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const response = await wordApi.generateWords();
      return response;
    } catch (error) {
      dispatch(apiCallError(error));
      throw error;
    }
  };
}

export function replayGame() {
  return async function (dispatch) {
    dispatch(restartGame());
  };
}
