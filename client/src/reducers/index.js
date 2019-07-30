import { combineReducers } from "redux";
import matchReducer from "./matchReducer";
import predictionReducer from "./predictionReducer";

export default combineReducers({
  match: matchReducer,
  prediction: predictionReducer
});
