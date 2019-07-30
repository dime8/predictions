import {
  GET_PREDICTIONS,
  DELETE_PREDICTION,
  ADD_PREDICTION,
  GET_PREDICTION,
  UPD_PREDICTION
} from "../actions/types";

const initialState = {
  predictions: [],
  prediction: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PREDICTIONS:
      return {
        ...state,
        predictions: action.payload
      };
    case GET_PREDICTION:
      return {
        ...state,
        predictions: action.payload
      };
    case DELETE_PREDICTION:
      return {
        ...state,
        predictions: state.predictions.filter(
          prediction => prediction.id !== action.payload
        )
      };
    case ADD_PREDICTION:
      return {
        ...state,
        predictions: [action.payload, ...state.predictions]
      };
    case UPD_PREDICTION:
      return {
        ...state,
        predictions: state.predictions.map(prediction =>
          prediction.id === action.payload.id
            ? (prediction = action.payload)
            : prediction
        )
      };
    default:
      return state;
  }
}
