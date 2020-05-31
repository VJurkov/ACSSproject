import Axios from "axios";

export const CUSTOMERS_LOADING = "CUSTOMERS_LOADING";
export const CUSTOMERS_DONE = "CUSTOMERS_DONE";
export const CUSTOMERS_ERROR = "CUSTOMERS_ERROR";

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";


export function customersLoadingAction() {
    return {
        type: CUSTOMERS_LOADING
    }
}
export function customersDoneAction(data) {
    return {
        type: CUSTOMERS_DONE,
        payload: data
    }
}
export function customersErrorAction(error) {
    return {
        type: CUSTOMERS_ERROR,
        payload: error
    }
}

export function setSearchTermAction(setSearchTerm) {
    return {
        type: SET_SEARCH_TERM,
        payload: setSearchTerm
    }
}

//nema parametra jer nista ne saljem nego samo ocu uhvatiti customerse
export function getCustomers() {
    return async (dispatch)=> {
        try {
            dispatch(customersLoadingAction());
        
            const cities = await Axios.get("http://www.fulek.com/nks/api/aw/cities");
            //axios api poziv
            const customers = await Axios.get("http://www.fulek.com/nks/api/aw/last200customers");

            const namedCustomers = customers.data.map((customer)=>{
                return {
                    ...customer,
                    CityName: cities.data.filter((city)=> customer.CityId===city.Id)[0].Name
                }
            })

            dispatch(customersDoneAction(namedCustomers));
        } catch (error) {
            dispatch(customersErrorAction(error.message));
        }

    }
}