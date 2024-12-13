import { all, fork } from "redux-saga/effects";
import { authWatcher } from "./authStore/auth.saga";

export default function* reduxSaga() {
  yield all([fork(authWatcher)]);
}
