import { FileValidator } from '@nestjs/common';
import { File } from 'files/types/file.types';
import magicBytes from 'magic-bytes.js';

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file?: File): boolean | Promise<boolean> {
    const fileSignature = magicBytes(file.buffer).map((file) => file.mime);

    if (!fileSignature.length) {
      return false;
    }

    const isMatch = fileSignature.includes(file.mimetype);
    if (!isMatch) {
      return false;
    }

    return true;
  }

  buildErrorMessage(): string {
    throw new Error(
      'Validation failed (file type does not match file signature)',
    );
  }
}
