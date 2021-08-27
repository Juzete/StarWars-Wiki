import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import wikiReducer from "./wikiReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  wiki: wikiReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
