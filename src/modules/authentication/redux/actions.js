
//akcije koje idu prema redux-u

import Axios from "axios";

export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_DONE = "REGISTER_DONE";
export const REGISTER_ERROR = "REGISTER_ERROR";

export function registerLoadingAction() {
    return {
        type: REGISTER_LOADING
    }
}
export function registerDoneAction(data) {
    return {
        type: REGISTER_DONE,
        payload: data
    }
}
export function registerErrorAction(error) {
    return {
        type: REGISTER_ERROR,
        payload: error
    }
}

export function registerUser(data) {
    return async (dispatch)=> {
        try {
            dispatch(registerLoadingAction());
        
            //axios api poziv
            const user = await Axios.post("http://www.fulek.com/nks/api/aw/registeruser", data)

            dispatch(registerDoneAction(user.data));
        } catch (error) {
            dispatch(registerErrorAction(error.message));
        }

    }
}