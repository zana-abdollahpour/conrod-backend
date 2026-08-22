import { Transform, plainToInstance } from 'class-transformer';
import { FilterOperationDto } from 'querying/dto/filter-operation.dto';

const toFilterOperationDtoFn = (
  value: string,
  filterSeparator = ':',
  operandsSeparator = ',',
) => {
  const plainDto = {
    operator: value,
    operands: [],
  };

  const filterSeparatorIndex = value.indexOf(filterSeparator);

  if (filterSeparatorIndex !== -1) {
    const operator = value.slice(0, filterSeparatorIndex);
    const concOperands = value.slice(filterSeparatorIndex + 1);

    const operandString = concOperands.split(operandsSeparator);
    const operands = operandString.map((op) => +op);

    plainDto.operator = operator;
    plainDto.operands = operands;
  }

  return plainToInstance(FilterOperationDto, plainDto);
};

export const ToFilterOperationDto = () =>
  Transform(({ value }) => toFilterOperationDtoFn(value));
