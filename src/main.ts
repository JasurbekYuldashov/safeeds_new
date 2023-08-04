import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({})
  );

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(2023);
}
bootstrap();
