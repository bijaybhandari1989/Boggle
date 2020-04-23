import { combineReducers } from "redux";
import auth from "./authReducer";
import word from "./wordReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  auth,
  word,
  apiCallsInProgress,
});

export default rootReducer;
