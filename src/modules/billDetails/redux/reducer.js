import {
  BILLDETAILS_LOADING,
  BILLDETAILS_DONE,
  BILLDETAILS_ERROR,
} from "./actions";

const initialState = {
  isLoading: false,
  //prazna lista - arej i lista u JS isto
  items: [],
  error: null,
};

export function billDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case BILLDETAILS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case BILLDETAILS_DONE:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
      };
    case BILLDETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
