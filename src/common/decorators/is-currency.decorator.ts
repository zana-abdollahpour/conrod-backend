import { applyDecorators } from '@nestjs/common';
import { IsNumber, IsPositive, ValidationOptions } from 'class-validator';

/** Checks if the value is a positive number greater than zero, with at most 2 decimals */
export function IsCurrency(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    IsNumber({ maxDecimalPlaces: 2 }, validationOptions),
    IsPositive(validationOptions),
  );
}
