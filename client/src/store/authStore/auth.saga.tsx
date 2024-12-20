import { HttpStatus } from "@/constants";
import { loginApi } from "@/services/api/auth.api";
import { StorageUtil } from "@/utils";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import { AuthActions } from "./auth.reducer";

export function* authWatcher() {
  yield all([takeLatest(AuthActions.loginRequest.type, loginWorker)]);
}

function* loginWorker(
  action: PayloadAction<any>
): Generator<CallEffect | PutEffect, void, any> {
  try {
    const response = yield call(loginApi, action.payload.loginForm);
    if (response.status === HttpStatus.OK) {
      const userId = response.data.data.userId;
      StorageUtil.setCookie("token", userId, 31536000);
      StorageUtil.setCookie("inSession", true, 31536000);
      const userInfo = response.data.data;
      delete userInfo.token;
      StorageUtil.setCookie("userInfo", JSON.stringify(userInfo), 31536000);
      yield put(AuthActions.loginSuccess(response.data));
      action.payload.navigate(response.data.data.userId);
    } else {
      yield put(AuthActions.loginFail(response.statusText));
    }
  } catch (error) {
    throw new Error();
  }
}
