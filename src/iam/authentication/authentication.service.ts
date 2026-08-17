import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'domain/users/entities/user.entity';
import { JwtPayload } from 'iam/authentication/interfaces/jwt-payload.interface';
import { RequestUser } from 'iam/authentication/interfaces/request-user.interface';
import { HashingService } from 'iam/hashing/hashing.abstract.service';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(email: string, password: string) {
    const user = await this.usersRepository.findOneOrFail({
      where: { email },
      select: { id: true, password: true },
    });

    const isMatch = await this.hashingService.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createRequestUser(user);
  }

  // TODO: implement a better solution
  async validateJwt(payload: JwtPayload) {
    const user = await this.usersRepository.findOneByOrFail({
      id: payload.sub,
    });

    return this.createRequestUser(user);
  }

  login(user: RequestUser) {
    const payload: JwtPayload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  getProfile(id: number) {
    return this.usersRepository.findOneByOrFail({ id });
  }

  private createRequestUser(user: User): RequestUser {
    return { id: user.id, role: user.role };
  }
}
