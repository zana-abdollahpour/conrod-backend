import { ArgumentsHost, Catch, HttpCode } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { HttpError } from 'common/util/http-error.util';
import { extractFromText } from 'common/util/regex.util';
import { DatabaseError } from 'database/interfaces/database-error.interface';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter extends BaseExceptionFilter {
  private readonly FIELD_NAME_REGEX = /Key \((\w+)\)=/;
  private readonly FIELD_VALUE_REGEX = /\)=\((.*?)\)/;

  private readonly DatabaseErrorCodes = {
    ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION: '23503',
    UNIQUE_VIOLATION: '23505',
  } as const satisfies Record<string, string>;

  private readonly messageSnippets = {
    ASSOCIATION_NOT_FOUND: 'is not found',
    NOT_NULL_VIOLATION: 'is still referenced',
  } as const satisfies Record<string, string>;

  private readonly descriptions = {
    ASSOCIATION_NOT_FOUND: 'Associated entity not found',
    NOT_NULL_VIOLATION: 'Can not delete due to not null constraint',
    UNIQUE_VIOLATION: 'Unique constraint violation',
  } as const satisfies Record<string, string>;

  private createErrorData(code: string, message: string) {
    let httpError: (typeof HttpError)[keyof typeof HttpError];
    let description: (typeof this.descriptions)[keyof typeof this.descriptions];

    switch (code) {
      case this.DatabaseErrorCodes.ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION:
        if (message.includes(this.messageSnippets.ASSOCIATION_NOT_FOUND)) {
          httpError = HttpError.NOT_FOUND;
          description = this.descriptions.ASSOCIATION_NOT_FOUND;
        } else if (message.includes(this.messageSnippets.NOT_NULL_VIOLATION)) {
          httpError = HttpError.CONFLICT;
          description = this.descriptions.NOT_NULL_VIOLATION;
        }
        break;

      case this.DatabaseErrorCodes.UNIQUE_VIOLATION:
        httpError = HttpError.CONFLICT;
        description = this.descriptions.UNIQUE_VIOLATION;
        break;

      default:
        break;
    }

    return { httpError, description };
  }

  private extractFieldNameAndValueFromMessage(message: string) {
    const fieldName = extractFromText(message, this.FIELD_NAME_REGEX);
    const fieldValue = extractFromText(message, this.FIELD_VALUE_REGEX);
    return { fieldName, fieldValue };
  }

  catch(exception: DatabaseError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const { code, detail } = exception;
    const { httpError, description } = this.createErrorData(code, detail);

    if (!HttpCode) {
      return super.catch(exception, host);
    }

    const { status } = httpError;
    const { fieldName, fieldValue } =
      this.extractFieldNameAndValueFromMessage(detail);

    const meta = { description, fieldName, fieldValue };

    response.status(status).json({
      statusCode: status,
      message: detail,
      meta,
    });
  }
}
