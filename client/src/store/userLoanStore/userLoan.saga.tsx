import { HttpStatus } from "@/constants";
import { getUserLoanListApi } from "@api/user-loan.api";
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import { CommonActions } from "../commonStore/common.reducer";
import { UserLoanActions } from "./userLoan.reducer";
import { toast } from "react-toastify";

export function* userLoanWatcher() {
  yield all([
    takeLatest(
      UserLoanActions.getUserLoanListRequest.type,
      getUserLoanListWorker
    ),
  ]);
}

function* getUserLoanListWorker(): Generator<
  CallEffect | PutEffect,
  void,
  any
> {
  yield put(CommonActions.startLoading());
  try {
    const response = yield call(getUserLoanListApi);
    if (response.status === HttpStatus.OK) {
      yield put(UserLoanActions.getUserLoanListSuccess(response.data.data));
    } else {
      yield put(UserLoanActions.getUserLoanListFail(response.data.message));
    }
  } catch (error) {
    console.log('asdhasiuhduasdhasud', error)
    toast.error(error as string);
      yield put(UserLoanActions.getUserLoanListFail(error));
      // console.log(error)
    throw new Error();
  } finally {
    yield put(CommonActions.stopLoading());
  }
}
