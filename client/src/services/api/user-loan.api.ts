import { ApiService } from "@/services";

const endpoint = "/user-loan";

export const getUserLoanListApi = async () =>{
  try {
    
    return await ApiService.get(`${endpoint}/list`);
  } catch (error) {
    console.log('error user-loan.api', error)
  }

}
