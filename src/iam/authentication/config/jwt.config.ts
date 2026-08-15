import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, type JwtSignOptions } from '@nestjs/jwt';

type ExpiresIn = JwtSignOptions['expiresIn'];

export default registerAs(
  'jwt',
  () =>
    ({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TTL as ExpiresIn },
    }) as const satisfies JwtModuleOptions,
);
