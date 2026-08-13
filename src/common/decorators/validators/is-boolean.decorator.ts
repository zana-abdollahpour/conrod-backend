import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean as DefaultIsBoolean,
  ValidationOptions,
} from 'class-validator';
import { ToBoolean } from 'common/decorators/transformers/to-boolean.decorator';

/** Checks if the value is a boolean. Works with query params. */
export function IsBoolean(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean());
}
