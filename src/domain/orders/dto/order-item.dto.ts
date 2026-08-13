import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';
import { IsIdEntity } from 'common/decorators/validators/is-id-entity.decorator';
import { IdDto } from 'common/dto/id.dto';

export class OrderItemDto {
  @IsIdEntity()
  product: IdDto;

  @IsCardinal()
  quantity: number;
}
