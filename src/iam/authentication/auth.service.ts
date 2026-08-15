import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'domain/users/entities/user.entity';
import { HashingService } from 'iam/hashing/hashing.abstract.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async validateLocal(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await this.hashingService.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { id: user.id };
  }
}
