import { all, fork } from "redux-saga/effects";
import { authWatcher } from "./authStore/auth.saga";
import { commonWatcher } from "./commonStore/common.saga";
import { loanWatcher } from "./loanStore/loan.saga";
import { userLoanWatcher } from "./userLoanStore/userLoan.saga";

export default function* reduxSaga() {
  yield all([
    fork(authWatcher),
    fork(commonWatcher),
    fork(loanWatcher),
    fork(userLoanWatcher),
  ]);
}
