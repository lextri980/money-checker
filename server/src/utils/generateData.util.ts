import { PaginatorQueryDto } from 'src/dto';
import { Like } from 'typeorm';
import { ValidateUtil } from './validate.util';

/**
 * Utility to get some specific datas
 */
export class GenerateDataUtil {
  /**
   * Get OTP with 6 digits
   * @returns string
   */
  static generateOtp() {
    const digits = '0123456789';
    let OTP = '';
    const length = digits.length;
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * length)];
    }
    return OTP;
  }

  /**
   * Get size, skip, sort object data to paginate
   * @param paginator PaginatorQueryDto
   * @returns PaginatorDataDto
   */
  static paginationFields(paginator: PaginatorQueryDto) {
    const sortValue = paginator.sort || 'createdAt-asc';
    const pageValue = paginator.page || 1;
    const sizeValue = paginator.size || 10;
    return {
      size: Number(sizeValue),
      skip: Number(pageValue) * Number(sizeValue) - Number(sizeValue),
      sortKey: sortValue.split('-')[0],
      sortValue: sortValue.split('-')[1].toUpperCase() as 'ASC' | 'DESC',
    };
  }

  /**
   * Get query SQL to WHERE [AND] datas
   * @param query object
   * @returns object
   */
  static findOnReqQuery(query: { [key: string]: string }) {
    const queryObject = {};
    const queryKey = Object.keys(query);
    queryKey.forEach((item) => {
      if (!ValidateUtil.isNullOrEmpty(query[item])) {
        queryObject[item] = Like(`%${query[item]}%`);
      }
    });
    return queryObject;
  }
}
