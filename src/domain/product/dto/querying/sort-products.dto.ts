import { IsIn, IsOptional } from 'class-validator';

import { Product } from 'domain/product/entities/product.entity';

const sort = ['name', 'price'] as const satisfies (keyof Product)[];
type Sort = (typeof sort)[number];

export class SortProductsDto {
  @IsOptional()
  @IsIn(sort)
  readonly sort?: Sort = 'name';
}
