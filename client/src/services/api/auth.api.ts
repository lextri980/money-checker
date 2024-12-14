import { ApiService } from "@/services";
import { ILogin } from "@/app/(auth-layout)/login/type";

const endpoint = "/auth";

export const loginApi = async (data: ILogin) =>
  await ApiService.post(`${endpoint}/login`, data);
