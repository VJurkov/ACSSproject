import { BILLS_LOADING, BILLS_DONE, BILLS_ERROR } from "./actions";

const initialState = {
  isLoading: false,
  //prazna lista - arej i lista u JS isto
  bills: [],
  error: null,
};

export function billsReducer(state = initialState, action) {
  switch (action.type) {
    case BILLS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case BILLS_DONE:
      return {
        ...state,
        isLoading: false,
        bills: action.payload,
      };
    case BILLS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
