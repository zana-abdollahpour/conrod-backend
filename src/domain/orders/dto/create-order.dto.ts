import { Type } from 'class-transformer';
import { ArrayNotEmpty, ArrayUnique, ValidateNested } from 'class-validator';

import { IsIdEntity } from 'common/decorators/is-id-entity.decorator';
import { IdDto } from 'common/dto/id.dto';
import { IdentifierFuncs } from 'common/util/id.util';
import { OrderItemDto } from 'domain/orders/dto/order-item.dto';

export class CreateOrderDto {
  @IsIdEntity()
  customer: IdDto;

  @ArrayNotEmpty()
  @ArrayUnique(IdentifierFuncs.ORDER_ITEM_DTO)
  @ValidateNested()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
