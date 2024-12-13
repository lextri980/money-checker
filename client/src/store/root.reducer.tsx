import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authStore/auth.reducer";
import exampleReducer from "./exampleStore/example.reducer";

export const rootReducer = combineReducers({
  example: exampleReducer,
  auth: authReducer,
});
