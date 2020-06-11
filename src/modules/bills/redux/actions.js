import Axios from "axios";

export const BILLS_LOADING = "BILLS_LOADING";
export const BILLS_DONE = "BILLS_DONE";
export const BILLS_ERROR = "BILLS_ERROR";

export function billsLoadingAction() {
  return {
    type: BILLS_LOADING,
  };
}
export function billsDoneAction(data) {
  return {
    type: BILLS_DONE,
    payload: data,
  };
}
export function billsErrorAction(error) {
  return {
    type: BILLS_ERROR,
    payload: error,
  };
}

export function getBills(customerId) {
  return async (dispatch) => {
    try {
      dispatch(billsLoadingAction());

      const bills = await Axios.get(
        "http://www.fulek.com/nks/api/aw/customerbills/" + customerId
      );

      dispatch(billsDoneAction(bills.data));
    } catch (error) {
      dispatch(billsErrorAction(error.message));
    }
  };
}
