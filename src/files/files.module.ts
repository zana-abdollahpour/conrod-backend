import { Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';
import { FilesExceptionFilter } from 'files/exception-filters/file-exception/file-exception.filter';
import { FsExtraService } from './storage/fs-extra/fs-extra.service';
import { StorageService } from './storage/storage.abstract.service';

@Module({
  providers: [
    { provide: StorageService, useClass: FsExtraService },
    { provide: APP_FILTER, useClass: FilesExceptionFilter },
  ],
  exports: [StorageService],
})
export class FilesModule {}
