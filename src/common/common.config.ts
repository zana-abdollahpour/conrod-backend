import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
} satisfies ValidationPipeOptions;

export const DefaultPageSizes = {
  USERS: 10,
  ORDERS: 5,
  CATEGORIES: 30,
} as const satisfies Record<string, number>;
