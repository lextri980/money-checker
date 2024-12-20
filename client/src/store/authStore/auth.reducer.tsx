import { createSlice } from "@reduxjs/toolkit";
import { IAuth } from "./interface";

const initialState: IAuth = {
  success: false,
  message: "",
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, _action) {
      state.success = false;
      state.message = "";
    },
    loginSuccess(state, _action) {
      state.success = true;
      state.message = "";
    },
    loginFail(state, action) {
      state.success = false;
      state.message = action.payload;
    },
  },
});

export const AuthActions = AuthReducer.actions;

export default AuthReducer.reducer;
