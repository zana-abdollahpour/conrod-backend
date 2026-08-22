import { IsIn, IsNumber, IsString } from 'class-validator';
import { ValidateFilterOperandsLength } from 'querying/decorators/validate-filter-operands-length.decorator';

const operators = ['lt', 'lte', 'gt', 'gte', 'eq', 'btw'] as const;
type Operator = (typeof operators)[number];

export class FilterOperationDto {
  @IsString()
  @IsIn(operators)
  operator: Operator;

  @IsNumber({}, { each: true })
  operands: number[];

  // This field is only added for the decorator which checks filter args length
  @ValidateFilterOperandsLength()
  private manyFieldValidation: unknown;
}
