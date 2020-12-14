import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'aws-sdk';
import { ConfigService } from './config/config.service';

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

  // Set up aws sdk
  const configService = new ConfigService({ folder: './config' });
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  await app.listen(3000);
}
bootstrap();
