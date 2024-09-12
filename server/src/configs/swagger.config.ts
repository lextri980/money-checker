import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fupartment Store')
  .setDescription('')
  .setVersion('1.0')
  .build();
