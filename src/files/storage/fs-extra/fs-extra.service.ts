import {
  ConflictException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import {
  createReadStream,
  mkdir,
  pathExists,
  readdir,
  remove,
  writeFile,
} from 'fs-extra';
import { join } from 'node:path';

import { BASE_PATH } from 'files/storage/fs-extra/fs-extra.config';
import { StorageService } from 'files/storage/storage.abstract.service';
import { File } from 'files/types/file.types';

@Injectable()
export class FsExtraService implements StorageService {
  async saveFile(path: string, file: File): Promise<void> {
    const { originalname, buffer } = file;
    const uniqueFileName = this.generateUniqueFilename(originalname);
    const fullPath = join(BASE_PATH, path, uniqueFileName);
    await writeFile(fullPath, buffer);
  }

  async createDir(path: string): Promise<void> {
    const fullPath = join(BASE_PATH, path);
    await mkdir(fullPath);
  }

  getFile(path: string): StreamableFile {
    const fullPath = join(BASE_PATH, path);
    const stream = createReadStream(fullPath);
    return new StreamableFile(stream);
  }

  getDirFileNames(path: string): Promise<string[]> {
    const fullPath = join(BASE_PATH, path);
    return readdir(fullPath);
  }

  async getDirFileCount(path: string): Promise<number> {
    const dirFileNames = await this.getDirFileNames(path);
    return dirFileNames.length;
  }

  async delete(path: string): Promise<void> {
    const fullPath = join(BASE_PATH, path);
    await remove(fullPath);
  }

  async validatePath(path: string): Promise<void> {
    const fullPath = join(BASE_PATH, path);
    if (!(await pathExists(fullPath))) {
      throw new NotFoundException('Path not found');
    }
  }

  validateFileCount(count: number, max: number): void {
    if (count > max) {
      throw new ConflictException('File count exceeds maximum limit');
    }
  }

  generateUniqueFilename(filename: string, separator = '-'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1e9);
    return `${timestamp}${separator}${random}${separator}${filename}`;
  }
}
