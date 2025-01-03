import { createSlice } from "@reduxjs/toolkit";
import { ILoan } from "./interface";

const initialState: ILoan = {
  success: false,
  message: "",
  loanList: [],
};

const LoanReducer = createSlice({
  name: "loan",
  initialState,
  reducers: {
    getLoanListRequest(state, _action) {
      state.success = false;
      state.message = "";
    },
    getLoanListSuccess(state, action) {
      state.success = true;
      state.message = "";
      state.loanList = action.payload;
    },
    getLoanListFail(state, action) {
      state.success = false;
      state.message = action.payload;
      state.loanList = [];
    },
  },
});

export const LoanActions = LoanReducer.actions;

export default LoanReducer.reducer;
