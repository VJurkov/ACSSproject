import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createRootReducer } from "./rootReducer";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export default function configureStore() {
  //ako postoji ekstenzija instalirana na browseru koristi nju, ako ne koristi compose funkciju od reduksa - standardnu
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  );
}
