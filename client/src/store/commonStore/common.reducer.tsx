import { createSlice } from "@reduxjs/toolkit";
import { ICommon } from "./interface";

const initialState: ICommon = {
  isGlobalLoading: false,
};

const CommonReducer = createSlice({
  name: "common",
  initialState,
  reducers: {
    startLoading(state) {
      state.isGlobalLoading = true;
    },
    stopLoading(state) {
      state.isGlobalLoading = false;
    },
  },
});

export const CommonActions = CommonReducer.actions;

export default CommonReducer.reducer;
