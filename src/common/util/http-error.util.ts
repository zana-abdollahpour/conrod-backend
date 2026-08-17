import { HttpStatus } from '@nestjs/common';

interface IHttpError {
  readonly status: HttpStatus;
  readonly error: string;
}

export const HttpError = {
  NOT_FOUND: { status: HttpStatus.NOT_FOUND, error: 'Not found' },
} as const satisfies Record<string, IHttpError>;
