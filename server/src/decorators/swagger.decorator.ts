import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

interface ISwagger {
  operation: {
    summary: string;
    description?: string;
  };
  body: {
    type: any;
    examples: any;
  };
  response: {
    status: number;
    content?: {
      'application/json': {
        examples: any;
      };
    };
  };
}

export function Swagger(swaggerAttr: ISwagger) {
  return applyDecorators(
    ApiOperation(swaggerAttr.operation),
    ApiBody(swaggerAttr.body),
    ApiResponse(swaggerAttr.response),
  );
}
