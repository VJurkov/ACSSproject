import { combineReducers } from 'redux';
import { authenticationReducer } from '../authentication/redux/reducer';
import { customersReducer } from '../customers/redux/reducer';


export default combineReducers({
    authentication: authenticationReducer,
    customers: customersReducer
});