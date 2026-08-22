import { IsIn, IsOptional, IsString } from 'class-validator';

const order = ['ASC', 'DESC'] as const;
type Order = (typeof order)[number];

export class OrderDto {
  @IsOptional()
  @IsString()
  @IsIn(order)
  order?: Order = 'ASC';
}
