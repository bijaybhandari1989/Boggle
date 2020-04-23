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

export function validate(word) {
  return async function (dispatch) {
    dispatch(beginApiCall());
    try {
      const response = await axios.post("validate", {
        word: word,
      });
      dispatch(validateSuccess(response.data));
    } catch (error) {
      dispatch(apiCallError(error));
      throw error.response.data;
    }
  };
}
