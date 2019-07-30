import {
  GET_PREDICTIONS,
  DELETE_PREDICTION,
  ADD_PREDICTION,
  GET_PREDICTION,
  UPD_PREDICTION
} from "./types";
import axios from "axios";

export const getMatchPredictions = id => async dispatch => {
  const res = await axios.get(
    `http://localhost:4000/matches/${id}/predictions`
  );
  dispatch({
    type: GET_PREDICTIONS,
    payload: res.data
  });
};
export const getMatch = id => async dispatch => {
  const res = await axios.get(`http://localhost:4000/matches/${id}`);

  dispatch({
    type: GET_PREDICTION,
    payload: res.data
  });
};
export const deleteMatch = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:4000/matches/${id}`);
    dispatch({
      type: DELETE_PREDICTION,
      payload: id
    });
  } catch (e) {
    dispatch({
      type: DELETE_PREDICTION,
      payload: id
    });
  }
};
export const addMatch = match => async dispatch => {
  const res = await axios.post("http://localhost:4000/matches", match);
  dispatch({
    type: ADD_PREDICTION,
    payload: res.data
  });
};

export const updMatch = match => async dispatch => {
  const res = await axios.put(
    `http://localhost:4000/matches/${match.id}}`,
    match
  );
  dispatch({
    type: UPD_PREDICTION,
    payload: res.data
  });
};
