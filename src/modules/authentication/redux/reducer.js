import {
  REGISTER_DONE,
  REGISTER_LOADING,
  REGISTER_ERROR,
  LOGIN_DONE,
  LOGIN_ERROR,
  LOGIN_LOADING,
  CLEAR_USER,
} from "./actions";

const initialState = {
  isRegisterLoading: false,
  isLoginLoading: false,
  currentUser: {},
  registerError: null,
  loginError: null,
};

export function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        isRegisterLoading: true,
      };
    case REGISTER_DONE:
      return {
        ...state,
        isRegisterLoading: false,
        currentUser: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        isRegisterLoading: false,
        registerError: action.payload,
      };

    case LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: true,
      };
    case LOGIN_DONE:
      return {
        ...state,
        isLoginLoading: false,
        currentUser: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoginLoading: false,
        loginError: action.payload,
      };
    case CLEAR_USER:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
