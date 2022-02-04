import { combineReducers } from "redux";
import { casesReducer } from "./reducers/casesReducer";
import { officersReducer } from "./reducers/officersReducer";
import { authorizationReducer } from "./reducers/authorizationReducer";

export const rootReducer = combineReducers({
  casesReducer,
  officersReducer,
  authorizationReducer,
});
