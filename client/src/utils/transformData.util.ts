/**
 * Utility to transform data to another format
 */
export default class TransformDataUtil {
  /**
   * Transform string to boolean
   * @param value - String with value "true" or "false"
   * @returns boolean | null
   */
  static stringToBoolean(value: string) {
    return value === "true" ? true : value === "false" ? false : null;
  }
  /**
   * Get query URL string from object
   * @param query - Object of query URL with key and value
   * @returns string
   */
  static getQueryString(query: { [key: string]: string }) {
    return (
      "?" +
      Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    );
  }
}
