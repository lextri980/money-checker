import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): object;
}

/**
 * Utility to format data passed in
 */
export class TransformDataUtil {
  /**
   * Format to reveal or hide some data [@Expose() to reveal] [@Exclude() to hide]
   * @param classDto ClassConstructor
   * @param plain any
   * @returns object
   */
  static serialize(classDto: ClassConstructor, plain: any) {
    return plainToClass(classDto, plain, { excludeExtraneousValues: true });
  }

  /**
   * Retrive and save data from DB as number type (setup decimal column type will return string as dafault)
   * @returns ValueTransformer
   */
  static transformDecimalColumn() {
    return {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    };
  }
}
