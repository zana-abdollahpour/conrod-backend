import { applyDecorators } from '@nestjs/common';
import { IsInt, IsPositive, ValidationOptions } from 'class-validator';

/** Checks if the value is a positive integer greater than zero. */
export function IsCardinal(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    IsInt(validationOptions),
    IsPositive(validationOptions),
  );
}
