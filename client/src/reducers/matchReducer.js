import {
  GET_MATCHES,
  DELETE_MATCH,
  ADD_MATCH,
  GET_MATCH,
  UPD_MATCH
} from "../actions/types";

const initialState = {
  matches: [],
  match: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload
      };
    case GET_MATCH:
      return {
        ...state,
        matches: action.payload
      };
    case DELETE_MATCH:
      return {
        ...state,
        matches: state.matches.filter(match => match.id !== action.payload)
      };
    case ADD_MATCH:
      return {
        ...state,
        matches: [action.payload, ...state.matches]
      };
    case UPD_MATCH:
      return {
        ...state,
        matches: state.matches.map(match =>
          match.id === action.payload.id ? (match = action.payload) : match
        )
      };
    default:
      return state;
  }
}
