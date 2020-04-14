import axios from "axios";

import { GET_USER } from "./types";

export const loadUser = () => dispatch => {
  axios
    .get("/api/currentUser")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      // console.log(err.response);
    });
};
