import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

import { HttpError } from 'common/util/http-error.util';
import { extractFromText } from 'common/util/regex.util';

@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly ENTITY_NAME_REGEX = /(?<=type\s")\w+/;

  private extractEntityFromMessage(message: string) {
    const entityName = extractFromText(message, this.ENTITY_NAME_REGEX);
    return { entityName };
  }

  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const { status, error } = HttpError.NOT_FOUND;
    const { entityName } = this.extractEntityFromMessage(exception.message);

    const message = `${entityName} not found`;

    res.status(status).json({ statusCode: status, message, error });
  }
}
