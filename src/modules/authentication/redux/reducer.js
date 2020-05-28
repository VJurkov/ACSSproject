import {REGISTER_DONE, REGISTER_LOADING, REGISTER_ERROR} from "./actions";


const initialState = {
    isLoading: false,
    currentUser: {},
    registerError: null
}

export function authenticationReducer(state = initialState, action) {
    switch (action.type) {
      case REGISTER_LOADING:
          return {
              ...state,
              isLoading: true
          }
          case REGISTER_DONE:
          return {
              ...state,
              isLoading: false,
              currentUser: action.payload
          }
          case REGISTER_LOADING:
          return {
              ...state,
              isLoading: false,
              registerError: action.payload
          }
        
      default:
        return state
    }
  }