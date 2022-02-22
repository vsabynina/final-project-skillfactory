import { combineReducers } from "redux";
import { casesReducer } from "./reducers/cases";
import { officersReducer } from "./reducers/officers";
import { authorizationReducer } from "./reducers/authorization";

export const rootReducer = combineReducers({
  casesReducer,
  officersReducer,
  authorizationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
