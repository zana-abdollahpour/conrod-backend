import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import bytes from 'bytes';

import { NonEmptyArray } from 'common/util/type.utils';

type AllowedFileType = 'jpg' | 'jpeg' | 'pdf';
type MaxSize = `${number}${bytes.Unit}`;

export const createFileValidator = (
  maxSize: MaxSize,
  ...fileTypes: NonEmptyArray<AllowedFileType>
): FileValidator[] => {
  const fileTypeRegex = new RegExp(fileTypes.join('|'));

  return [
    new MaxFileSizeValidator({ maxSize: bytes(maxSize) }),
    new FileTypeValidator({ fileType: fileTypeRegex }),
  ];
};
