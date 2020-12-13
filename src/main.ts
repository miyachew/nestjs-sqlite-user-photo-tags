import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Enable Helmet Middleware
  app.use(helmet());

  // Enable cors
  app.enableCors();

  // Decrease the size of the response body
  app.use(compression());

  // Support application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true }));

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
    whitelist: true
  }));

  await app.listen(3000);
}
bootstrap();
