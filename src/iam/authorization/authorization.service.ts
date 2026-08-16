import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'domain/users/entities/user.entity';
import { Role } from 'iam/authorization/enum/roles.enum';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async assignRole(id: number, role: Role) {
    const user = await this.usersRepository.preload({ id, role });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.save(user);
  }
}
