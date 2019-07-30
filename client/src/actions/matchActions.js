import {
  GET_MATCHES,
  DELETE_MATCH,
  ADD_MATCH,
  GET_MATCH,
  UPD_MATCH
} from "./types";
import axios from "axios";

export const getMatches = () => async dispatch => {
  const res = await axios.get("http://localhost:4000/matches");
  dispatch({
    type: GET_MATCHES,
    payload: res.data
  });
};
export const getMatch = id => async dispatch => {
  const res = await axios.get(`http://localhost:4000/matches/${id}`);

  dispatch({
    type: GET_MATCH,
    payload: res.data
  });
};
export const deleteMatch = id => async dispatch => {
  try {
    await axios.delete(`http://localhost:4000/matches/${id}`);
    dispatch({
      type: DELETE_MATCH,
      payload: id
    });
  } catch (e) {
    dispatch({
      type: DELETE_MATCH,
      payload: id
    });
  }
};
export const addMatch = match => async dispatch => {
  const res = await axios.post("http://localhost:4000/matches", match);
  dispatch({
    type: ADD_MATCH,
    payload: res.data
  });
};

export const updMatch = match => async dispatch => {
  const res = await axios.put(
    `http://localhost:4000/matches/${match.id}}`,
    match
  );
  dispatch({
    type: UPD_MATCH,
    payload: res.data
  });
};
