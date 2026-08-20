import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  BASE_PATH,
  STATIC_SERVE_PATH,
} from 'files/storage/fs-extra/fs-extra.config';
import { resolve } from 'node:path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(BASE_PATH),
      serveRoot: STATIC_SERVE_PATH,
    }),
  ],
})
export class StaticModule {}
