/**
 * Utility to transform data to another format
 */
export default class TransformDataUtil {
  /**
   * Transform string to boolean
   * @param value string
   * @returns boolean | null
   */
  static stringToBoolean(value: string) {
    return value === "true" ? true : value === "false" ? false : null;
  }
}
