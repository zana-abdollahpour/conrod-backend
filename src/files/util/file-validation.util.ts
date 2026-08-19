import {
  FileTypeValidator,
  FileValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import bytes from 'bytes';
import { lookup } from 'mime-types';

import { NonEmptyArray } from 'common/util/type.utils';
import { FileSignatureValidator } from 'files/validators/file-signature.validator';

type AllowedFileType = 'jpg' | 'jpeg' | 'pdf';
type MaxSize = `${number}${bytes.Unit}`;

const createMimeTypesRegex = (fileTypes: AllowedFileType[]) => {
  const mediaTypes = fileTypes.map((type) => lookup(type));
  return new RegExp(mediaTypes.join('|'));
};

export const createFileValidator = (
  maxSize: MaxSize,
  ...fileTypes: NonEmptyArray<AllowedFileType>
): FileValidator[] => {
  const fileMimeTypesRegex = createMimeTypesRegex(fileTypes);

  return [
    new MaxFileSizeValidator({ maxSize: bytes(maxSize) }),
    new FileTypeValidator({ fileType: fileMimeTypesRegex }),
    new FileSignatureValidator(),
  ];
};
