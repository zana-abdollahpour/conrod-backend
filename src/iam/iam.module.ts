import { Module } from '@nestjs/common';

import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.abstract.service';
import { IamController } from './iam.controller';
import { IamService } from './iam.service';

@Module({
  controllers: [IamController],
  providers: [IamService, { provide: HashingService, useClass: BcryptService }],
  exports: [HashingService],
})
export class IamModule {}
