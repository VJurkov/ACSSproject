//akcije koje idu prema redux-u

import Axios from "axios";
// register
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_DONE = "REGISTER_DONE";
export const REGISTER_ERROR = "REGISTER_ERROR";
//login
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_DONE = "LOGIN_DONE";
export const LOGIN_ERROR = "LOGIN_ERROR";

export function registerLoadingAction() {
  return {
    type: REGISTER_LOADING,
  };
}
export function registerDoneAction(data) {
  return {
    type: REGISTER_DONE,
    payload: data,
  };
}
export function registerErrorAction(error) {
  return {
    type: REGISTER_ERROR,
    payload: error,
  };
}

export function registerUser(data) {
  return async (dispatch) => {
    try {
      dispatch(registerLoadingAction());

      //axios api poziv
      const user = await Axios.post(
        "http://www.fulek.com/nks/api/aw/registeruser",
        data
      );

      localStorage.setItem("TOKEN", user.data.token);
      dispatch(registerDoneAction(user.data));
    } catch (error) {
      dispatch(registerErrorAction(error.message));
    }
  };
}
export function loginLoadingAction() {
  return {
    type: LOGIN_LOADING,
  };
}
export function loginDoneAction(data) {
  return {
    type: LOGIN_DONE,
    payload: data,
  };
}
export function loginErrorAction(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

export function loginUser(data) {
  return async (dispatch) => {
    try {
      dispatch(loginLoadingAction());

      //axios api poziv
      const user = await Axios.post(
        "http://www.fulek.com/nks/api/aw/login",
        data
      );

      //hvatamo podatke ulogiranog usera
      const userData = await Axios.post(
        "http://www.fulek.com/nks/api/aw/getUser",
        { username: user.data.username }
      );

      const loggedinUser = {
        ...userData.data,
        token: user.data.token,
      };

      localStorage.setItem("TOKEN", user.data.token);
      dispatch(loginDoneAction(loggedinUser));
    } catch (error) {
      dispatch(loginErrorAction(error.message));
    }
  };
}
