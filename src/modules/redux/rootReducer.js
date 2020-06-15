import { combineReducers } from "redux";
import { authenticationReducer } from "../authentication/redux/reducer";
import { customersReducer } from "../customers/redux/reducer";
import { billsReducer } from "../bills/redux/reducer";
import { billDetailsReducer } from "../billDetails/redux/reducer";
import { addItemReducer } from "../billDetails/redux/addItemReducer";
import { connect } from "formik";
import { connectRouter } from "connected-react-router";
export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    authentication: authenticationReducer,
    customers: customersReducer,
    bills: billsReducer,
    billDetails: billDetailsReducer,
    addItem: addItemReducer,
  });
