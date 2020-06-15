//akcije koje idu prema redux-u

import Axios from "axios";
import { push, go } from "connected-react-router";
import { callEndPoint } from "../../../shared/apiClient";
// register
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_DONE = "REGISTER_DONE";
export const REGISTER_ERROR = "REGISTER_ERROR";
//login
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_DONE = "LOGIN_DONE";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const CLEAR_USER = "CLEAR_USER";

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
export function clearUserAction() {
  return {
    type: CLEAR_USER,
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
      localStorage.setItem("USERNAME", user.data.username);
      dispatch(registerDoneAction(user.data));
      dispatch(push("/"));
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
      localStorage.setItem("USERNAME", user.data.username);
      dispatch(loginDoneAction(loggedinUser));
      dispatch(push("/"));
    } catch (error) {
      dispatch(loginErrorAction(error.message));
    }
  };
}
//fake login
export function getUserDetails(token, username) {
  return async (dispatch) => {
    try {
      dispatch(loginLoadingAction());

      //hvatamo podatke ulogiranog usera
      const userData = await Axios.post(
        "http://www.fulek.com/nks/api/aw/getUser",
        { username: username }
      );

      const loggedinUser = {
        ...userData.data,
        token: token,
      };

      dispatch(loginDoneAction(loggedinUser));
    } catch (error) {
      dispatch(loginErrorAction(error.message));
    }
  };
}

export function logout(token, username) {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(clearUserAction());
  };
}

export function editUser(data) {
  return async (dispatch) => {
    try {
      dispatch(registerLoadingAction());
      console.log(data);
      const user = await callEndPoint(
        "POST",
        "http://www.fulek.com/nks/api/aw/editUser",
        data
      );
      localStorage.setItem("USERNAME", user.data.username);
      dispatch(registerDoneAction(user.data));
      dispatch(push("/"));
    } catch (error) {
      dispatch(registerErrorAction(error.message));
    }
  };
}
