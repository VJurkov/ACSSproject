import { combineReducers } from 'redux';
import { authenticationReducer } from '../authentication/redux/reducer';


export default combineReducers({
    authentication: authenticationReducer
});