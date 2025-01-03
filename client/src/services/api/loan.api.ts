import { ApiService } from "@/services";

const endpoint = "/loan";

export const loanListApi = async (query: string) =>
  await ApiService.get(`${endpoint}/list${query}`);
