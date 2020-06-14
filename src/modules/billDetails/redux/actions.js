import Axios from "axios";
import { billItemFormSelector } from "./selectors";
import { callEndPoint } from "../../../shared/apiClient";

export const BILLDETAILS_LOADING = "BILLDETAILS_LOADING";
export const BILLDETAILS_DONE = "BILLDETAILS_DONE";
export const BILLDETAILS_ERROR = "BILLDETAILS_ERROR";

export const UPDATE_ADD_ITEM = "UPDATE_ADD_ITEM";

export const ADDITEM_LOADING = "ADDITEM_LOADING";
export const ADDITEM_DONE = "ADDITEM_DONE";
export const ADDITEM_ERROR = "ADDITEM_ERROR";

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

export function addItemLoadingAction() {
  return {
    type: ADDITEM_LOADING,
  };
}
export function addItemDoneAction(data) {
  return {
    type: ADDITEM_DONE,
    payload: data,
  };
}
export function addItemErrorAction(error) {
  return {
    type: ADDITEM_ERROR,
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

export function getSubCategories(categoryId) {
  return async (dispatch, getState) => {
    try {
      const subcategories = await Axios.get(
        "http://www.fulek.com/nks/api/aw/subcategories/" + categoryId
      );
      const state = await getState();
      const form = billItemFormSelector(state);

      dispatch(
        updateAddItemAction({ ...form, subcategories: subcategories.data })
      );
    } catch (error) {
      alert("error");
    }
  };
}

export function getProducts(subCategoryId) {
  return async (dispatch, getState) => {
    try {
      const products = await Axios.get(
        "http://www.fulek.com/nks/api/aw/products/" + subCategoryId
      );
      const state = await getState();
      const form = billItemFormSelector(state);

      dispatch(updateAddItemAction({ ...form, products: products.data }));
    } catch (error) {
      alert("error");
    }
  };
}

export function saveItem(data) {
  return async (dispatch, getState) => {
    try {
      dispatch(addItemLoadingAction());
      console.log(data);
      await callEndPoint(
        "POST",
        "http://www.fulek.com/nks/api/aw/additem",
        data
      );
      dispatch(addItemDoneAction());
      dispatch(getBillsDetails(data.BillId));
    } catch (error) {
      dispatch(addItemErrorAction(error.message));
      alert("error");
    }
  };
}

export function deleteItem(itemId, billId) {
  return async (dispatch, getState) => {
    try {
      await callEndPoint("POST", "http://www.fulek.com/nks/api/aw/deleteItem", {
        id: itemId,
      });
      dispatch(getBillsDetails(billId));
    } catch (error) {
      dispatch(addItemErrorAction(error.message));
      alert("error");
    }
  };
}
