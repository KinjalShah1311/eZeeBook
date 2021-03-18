import axios from "axios";
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

import { useAuth } from "../../contexts/AuthContext";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const { login } = useAuth();
  login(userData.email, userData.password)
    .then((x) => {
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
      //setError("Incorrect Email or Password. Please try again!");
    });
};

export const getUserData = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
