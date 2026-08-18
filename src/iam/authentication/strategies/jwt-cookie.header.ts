import { ApiResponseOptions } from '@nestjs/swagger';

export const jwtCookieHeader: ApiResponseOptions['headers'] = {
  'Set-Cookie': { description: 'jwt cookie', schema: { type: 'string' } },
};
