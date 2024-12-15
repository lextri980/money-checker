import { AxiosResponse } from "axios";
import { SagaReturnType } from "redux-saga/effects";

// eslint-disable-next-line
export type ResponseType<T extends (...arg: any) => Promise<AxiosResponse>> =
  SagaReturnType<T>;
