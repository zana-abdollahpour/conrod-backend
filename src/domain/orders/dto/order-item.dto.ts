import { IsCardinal } from 'common/decorators/is-cardinal.decorator';
import { IsIdEntity } from 'common/decorators/is-id-entity.decorator';
import { IdDto } from 'common/dto/id.dto';

export class OrderItemDto {
  @IsIdEntity()
  product: IdDto;

  @IsCardinal()
  quantity: number;
}
