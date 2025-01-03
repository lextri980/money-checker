import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authStore/auth.reducer";
import commonReducer from "./commonStore/common.reducer";
import loanReducer from "./loanStore/loan.reducer";
import userLoanReducer from "./userLoanStore/userLoan.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  loan: loanReducer,
  userLoan: userLoanReducer,
});
