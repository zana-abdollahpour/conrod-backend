import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envValidationSchema } from './env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: envValidationSchema,
    }),
  ],
})
export class EnvModule {}
