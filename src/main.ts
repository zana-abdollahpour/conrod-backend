import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { createSwaggerDocument } from 'swagger/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // TODO: configure properly according to production need
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');

  createSwaggerDocument(app);

  await app.listen(port ?? 3000);
}

void bootstrap();
