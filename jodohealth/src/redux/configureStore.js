import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/AuthReducer";
import { otherReducer } from "./reducers/OtherReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  other: otherReducer,
});

const store = configureStore({
  reducer: rootReducer,

});

export default store;
