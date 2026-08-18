import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = {
  title: 'The Conrod shop',
  description: 'Documentation for the shop API',
  version: '1.0.0',
  path: 'api-docs',
} as const;

const bearerAuthConfig = [
  {
    type: 'http',
    scheme: 'Bearer',
    bearerFormat: 'JWT',
  },
] as const satisfies Parameters<DocumentBuilder['addBearerAuth']>;

export function createSwaggerDocument(app: INestApplication) {
  const builder = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth(...bearerAuthConfig);

  const config = builder.build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerConfig.path, app, document);
}
