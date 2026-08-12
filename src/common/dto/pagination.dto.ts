import { IsOptional } from 'class-validator';
import { IsCardinal } from 'common/decorators/is-cardinal.decorator';

export class PaginationDto {
  @IsOptional()
  @IsCardinal()
  limit: number;

  @IsOptional()
  @IsCardinal()
  offset: number;
}
