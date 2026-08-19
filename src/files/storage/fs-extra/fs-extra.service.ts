import { Injectable, StreamableFile } from '@nestjs/common';

import { StorageService } from 'files/storage/storage.abstract.service';
import { File } from 'files/types/file.types';

@Injectable()
export class FsExtraService implements StorageService {
  saveFile(path: string, file: File): Promise<void> {
    throw new Error('Method not implemented.');
  }

  createDir(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getFile(path: string): StreamableFile {
    throw new Error('Method not implemented.');
  }

  getDirFileNames(path: string): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  getDirFileCount(path: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  delete(path: string): Promise<number> {
    throw new Error('Method not implemented.');
  }

  validatePath(path: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
