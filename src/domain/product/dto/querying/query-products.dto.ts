import { IntersectionType } from '@nestjs/swagger';

import { FilterProductsDto } from 'domain/product/dto/querying/filter-products.dto';
import { SortProductsDto } from 'domain/product/dto/querying/sort-products.dto';
import { OrderDto } from 'querying/dto/order.dto';
import { PaginationDto } from 'querying/dto/pagination.dto';

export class QueryProductsDto extends IntersectionType(
  OrderDto,
  PaginationDto,
  FilterProductsDto,
  SortProductsDto,
) {}
