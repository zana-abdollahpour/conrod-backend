import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

import { HashingService } from './hashing.abstract.service';

@Injectable()
export class BcryptService implements HashingService {
  async hash(plainText: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(plainText, salt);
  }

  compare(plainText: string | Buffer, cipherText: string): Promise<boolean> {
    return compare(plainText, cipherText);
  }
}
