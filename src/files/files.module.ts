import { Module } from '@nestjs/common';

import { FsExtraService } from './storage/fs-extra/fs-extra.service';
import { StorageService } from './storage/storage.abstract.service';

@Module({
  providers: [{ provide: StorageService, useClass: FsExtraService }],
  exports: [StorageService],
})
export class FilesModule {}
