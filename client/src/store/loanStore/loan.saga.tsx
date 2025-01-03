import { HttpStatus } from "@/constants";
import { loanListApi } from "@api/loan.api";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import { CommonActions } from "../commonStore/common.reducer";
import { LoanActions } from "./loan.reducer";

export function* loanWatcher() {
  yield all([
    takeLatest(LoanActions.getLoanListRequest.type, getLoanListWorker),
  ]);
}

function* getLoanListWorker(
  action: PayloadAction<any>
): Generator<CallEffect | PutEffect, void, any> {
  try {
    const response = yield call(loanListApi, action.payload.query);
    if (response.status === HttpStatus.OK) {
      yield put(LoanActions.getLoanListSuccess(response.data.data));
    } else {
      yield put(LoanActions.getLoanListFail(response.data.message));
    }
  } catch (error) {
    throw new Error();
  } finally {
    yield put(CommonActions.stopLoading());
  }
}
