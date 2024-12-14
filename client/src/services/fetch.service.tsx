import { DefaultResponseType } from "@/types/common.type";

/**
 * Api service from fetch
 */
class FetchService {
  /**
   * Calling fetch
   * @param apiUrl string
   * @returns Promise
   */
  public static async fetch(apiUrl: string): Promise<DefaultResponseType> {
    const response = await fetch(`${process.env.BASE_URL}${apiUrl}`);
    return response.json();
  }
}

export default FetchService;
