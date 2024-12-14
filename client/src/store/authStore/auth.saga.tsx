import { ILogin } from "@/app/(auth-layout)/login/type";
import { HttpStatus } from "@/constants";
import { loginApi } from "@/services/api/auth.api";
import { ResponseType } from "@/types";
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

function* loginWorker(action: PayloadAction<ILogin>): any {
  try {
    const response = yield call(loginApi, action.payload);
    if (response.status === HttpStatus.OK) {
      yield put(AuthActions.loginSuccess(response.data));
    } else {
      yield put(AuthActions.loginFail(response.statusText));
    }
  } catch (error) {
    throw new Error();
  }
}
