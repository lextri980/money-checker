import { Response } from 'express';
import { PaginatorDataDto } from 'src/dto';

/**
 * Utility to get http response data
 */
export class ResponseUtil {
  /**
   * When status is OK [200] => Get JSON response
   * @param res Response
   * @param data object | array | void
   * @param message string
   * @returns Response
   */
  static success(
    res: Response,
    data:
      | { [key: string]: string | number | boolean | any }
      | { [key: string]: string | number | boolean | any }[]
      | void,
    message?: string,
    paginator?: PaginatorDataDto,
  ) {
    if (data) {
      if (paginator) {
        return res.status(200).json({
          success: true,
          message: message,
          data: data,
          paginator,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: message,
          data: data,
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: message,
      });
    }
  }

  /**
   * When status is Created [201] => Get JSON response
   * @param res Response
   * @param data object | array | void
   * @param message string
   * @return Response
   */
  static created(
    res: Response,
    data:
      | { [key: string]: string | number | boolean | any }
      | { [key: string]: string | number | boolean | any }[]
      | void,
    message?: string,
  ) {
    return res.status(201).json({
      success: true,
      message: message,
      data: data,
    });
  }

  /**
   * When status is Bad request [400] => Get JSON response
   * @param res Response
   * @param message Mstring
   * @return Response
   */
  static badRequest(res: Response, message?: string) {
    return res.status(400).json({
      success: false,
      message: message,
    });
  }

  /**
   * When status is Not found [404] => Get JSON response
   * @param res Response
   * @param message string
   * @return Response
   */
  static notFound(res: Response, message?: string) {
    return res.status(404).json({
      success: false,
      message: message,
    });
  }

  /**
   * When status is Internal Server Error [500] => Get JSON response
   * @param res Response
   * @param message string
   * @return Response
   */
  static serverError(res: Response, error: string) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.split('TypeError: ').pop().split('\n'),
    });
  }
}
