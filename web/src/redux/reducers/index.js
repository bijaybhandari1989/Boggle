import { combineReducers } from "redux";
import auth from "./authReducer";
import words from "./wordReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  auth,
  words,
  apiCallsInProgress,
});

export default rootReducer;
