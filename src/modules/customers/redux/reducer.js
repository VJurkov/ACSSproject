import { CUSTOMERS_LOADING, CUSTOMERS_DONE, CUSTOMERS_ERROR, SET_SEARCH_TERM } from "./actions"

const initialState = {
    isLoading: false,
    //prazna lista - arej i lista u JS isto
    customers: [],
    error: null,
    searchTerm: null

}

export function customersReducer(state = initialState, action) {
    switch (action.type) {
        case CUSTOMERS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CUSTOMERS_DONE:
            return {
                ...state,
                isLoading: false,
                customers: action.payload
            }
        case CUSTOMERS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload
            }

        default:
            return state
    }
}