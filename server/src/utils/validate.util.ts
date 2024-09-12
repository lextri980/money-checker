/**
 * Utility to check validate one or more datas
 */
export class ValidateUtil {
  /**
   * Check a data whether null, undefined, empty string or empty object
   * @returns boolean
   */
  static isNullOrEmpty(data: string | object) {
    if (typeof data === 'string' && data === '') {
      return true;
    } else if (typeof data === 'object' && Object.keys(data).length === 0) {
      return true;
    } else if (data === null || data === undefined) {
      return true;
    }
    return false;
  }
}
