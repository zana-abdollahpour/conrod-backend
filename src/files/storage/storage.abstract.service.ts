import { Injectable, StreamableFile } from '@nestjs/common';

import { File } from 'files/types/file.types';

@Injectable()
export abstract class StorageService {
  abstract saveFile(path: string, file: File): Promise<void>;

  abstract createDir(path: string): Promise<void>;

  abstract getFile(path: string): StreamableFile;

  abstract getDirFileNames(path: string): Promise<string[]>;

  abstract getDirFileCount(path: string): Promise<number>;

  abstract delete(path: string): Promise<void>;

  abstract validatePath(path: string): Promise<void>;

  abstract validateFileCount(count: number, max: number): void;

  abstract generateUniqueFilename(filename: string): string;
}
