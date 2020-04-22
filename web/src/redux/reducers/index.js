import { combineReducers } from "redux";
import auth from "./authReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  auth,
  apiCallsInProgress,
});

export default rootReducer;
