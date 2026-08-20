import { IsString } from 'class-validator';

export class FilenameDto {
  @IsString()
  filename: string;
}
