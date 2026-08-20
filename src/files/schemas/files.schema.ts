import { ApiFilesProperty } from 'files/decorators/api-files-property.decorator';
import type { File } from 'files/types/file.types';

export class FilesSchema {
  @ApiFilesProperty()
  file: File[];
}
