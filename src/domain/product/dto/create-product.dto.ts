import {
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { IsCurrency } from 'common/decorators/validators/is-currency.decorator';
import { IsIdEntity } from 'common/decorators/validators/is-id-entity.decorator';
import { IdDto } from 'common/dto/id.dto';
import { IdentifierFuncs } from 'common/util/id.util';

export class CreateProductDto {
  @IsString()
  @Length(2, 40)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description: string;

  @IsCurrency()
  price: number;

  @ArrayNotEmpty()
  @ArrayUnique(IdentifierFuncs.ID_DTO)
  @IsIdEntity()
  categories: IdDto[];
}
