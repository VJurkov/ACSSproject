import { UPDATE_ADD_ITEM } from "./actions";

const initialState = {
  form: {
    categories: [],
    subcategories: [],
    products: [],
  },
};

export function addItemReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ADD_ITEM:
      return {
        ...state,
        form: action.payload,
      };

    default:
      return state;
  }
}
