import {
  UPDATE_ADD_ITEM,
  ADDITEM_DONE,
  ADDITEM_LOADING,
  ADDITEM_ERROR,
} from "./actions";

const initialState = {
  form: {
    categories: [],
    subcategories: [],
    products: [],
  },
  isLoading: false,
  error: null,
};

export function addItemReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ADD_ITEM:
      return {
        ...state,
        form: action.payload,
      };
    case ADDITEM_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ADDITEM_DONE:
      return {
        ...state,
        isLoading: false,
      };
    case ADDITEM_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
