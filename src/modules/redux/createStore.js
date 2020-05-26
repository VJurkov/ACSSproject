import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default function configureStore() {
    //ako postoji ekstenzija instalirana na browseru koristi nju, ako ne koristi compose funkciju od reduksa - standardnu
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 return createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
 );
}