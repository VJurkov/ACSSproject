import Axios from "axios";
import { billItemFormSelector } from "./selectors";

export const BILLDETAILS_LOADING = "BILLDETAILS_LOADING";
export const BILLDETAILS_DONE = "BILLDETAILS_DONE";
export const BILLDETAILS_ERROR = "BILLDETAILS_ERROR";

export const UPDATE_ADD_ITEM = "UPDATE_ADD_ITEM";

export function updateAddItemAction(data) {
  return {
    type: UPDATE_ADD_ITEM,
    payload: data,
  };
}

export function billDetailsLoadingAction() {
  return {
    type: BILLDETAILS_LOADING,
  };
}
export function billDetailsDoneAction(data) {
  return {
    type: BILLDETAILS_DONE,
    payload: data,
  };
}
export function billDetailsErrorAction(error) {
  return {
    type: BILLDETAILS_ERROR,
    payload: error,
  };
}

export function getBillsDetails(billId) {
  return async (dispatch) => {
    try {
      dispatch(billDetailsLoadingAction());

      const billDetails = await Axios.get(
        "http://www.fulek.com/nks/api/aw/billitems/" + billId
      );

      dispatch(billDetailsDoneAction(billDetails.data));
    } catch (error) {
      dispatch(billDetailsErrorAction(error.message));
    }
  };
}

export function getCategories() {
  return async (dispatch, getState) => {
    try {
      const categories = await Axios.get(
        "http://www.fulek.com/nks/api/aw/categories"
      );
      const state = await getState();
      const form = billItemFormSelector(state);

      dispatch(updateAddItemAction({ ...form, categories: categories.data }));
    } catch (error) {
      alert("error");
    }
  };
}
