import * as moment from 'moment';
import { TimeUnitEnum } from 'src/constants';

/**
 * Utility to get or format dates
 */
export class DateUtil {
  /**
   * Get the date formated
   * @param date Date
   * @param format string
   * @returns string
   */
  static formatDate(date: Date, format: string = 'DD-MM-YYYY') {
    const dateValue = moment(date).format(format);
    return dateValue;
  }

  /**
   * Calculate the different of 2 dates
   * @param dateStart Date
   * @param dateEnd Date
   * @param timeUnit string
   * @returns Object { dateDiff: number, timeUnit: string }
   */
  static dateDiff(
    dateStart: Date,
    dateEnd: Date,
    timeUnit: TimeUnitEnum = TimeUnitEnum.days,
  ) {
    const dateStartValue = moment(dateStart);
    const dateEndValue = moment(dateEnd);
    const dateDiff = dateEndValue.diff(dateStartValue, timeUnit, true);
    return {
      dateDiff,
      timeUnit,
    };
  }

  /**
   * Change date string from DD/MM/YYYY to Date type
   * @param date string
   * @returns Date
   */
  static dateStringToDate(date: string) {
    const [day, month, year] = date.split('/');
    const dateForm = new Date(+year, +month - 1, +day);
    return dateForm;
  }
}
