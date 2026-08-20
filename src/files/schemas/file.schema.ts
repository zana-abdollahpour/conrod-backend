import { ApiFileProperty } from 'files/decorators/api-file-property.decorator';
import type { File } from 'files/types/file.types';

export class FileSchema {
  @ApiFileProperty()
  file: File;
}
