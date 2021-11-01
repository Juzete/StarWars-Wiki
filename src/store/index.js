import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import wikiReducer from "./reducers/wikiReducer";

const rootReducer = combineReducers({
  wiki: wikiReducer,
});

const loggerMiddleware = (store) => (next) => (action) => {
  let result;
  console.groupCollapsed("dispatching", action.type);
  console.log("prev state", store.getState());
  console.log("action", action);
  result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk, loggerMiddleware))
    : applyMiddleware(thunk)
);
