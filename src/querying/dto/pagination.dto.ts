import { IsOptional, Max } from 'class-validator';

import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';
import { MAX_PAGE_NUMBER, MAX_PAGE_SIZE } from 'querying/querying.config';

export class PaginationDto {
  @IsOptional()
  @IsCardinal()
  @Max(MAX_PAGE_SIZE)
  limit?: number;

  @IsOptional()
  @IsCardinal()
  @Max(MAX_PAGE_NUMBER)
  page?: number = 1;
}
