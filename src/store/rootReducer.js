import { combineReducers } from "redux";
import { casesReducer } from "./reducers/casesReducer";
import { officersReducer } from "./reducers/officersReducer";

export const rootReducer = combineReducers({ casesReducer, officersReducer });