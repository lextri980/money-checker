import { createSlice } from "@reduxjs/toolkit";
import { IUserLoan } from "./interface";

const initialState: IUserLoan = {
  success: false,
  message: "",
};

const UserLoanReducer = createSlice({
  name: "userLoan",
  initialState,
  reducers: {
    getUserLoanListRequest(state) {
      state.success = false;
      state.message = "";
    },
    getUserLoanListSuccess(state, _action) {
      state.success = true;
      state.message = "";
    },
    getUserLoanListFail(state, action) {
      state.success = false;
      state.message = action.payload;
    },
  },
});

export const UserLoanActions = UserLoanReducer.actions;

export default UserLoanReducer.reducer;
