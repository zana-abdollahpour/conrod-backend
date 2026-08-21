import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginDto } from 'iam/authentication/dto/login.dto';
import { RequestUser } from 'iam/authentication/interfaces/request-user.interface';
import { assertUserAccess } from 'iam/authorization.utils';
import { Role } from 'iam/authorization/enum/roles.enum';
import { HashingService } from 'iam/hashing/hashing.abstract.service';
import { PaginationDto } from 'querying/dto/pagination.dto';
import { DefaultPageSizes } from 'querying/querying.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;

    const skip = offset;
    const take = limit || DefaultPageSizes.USERS;

    return this.usersRepository.find({ skip, take });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneOrFail({
      where: { id },
      relations: { orders: { items: true, payment: true } },
    });
  }

  async update(
    id: number,
    currentUser: RequestUser,
    updateUserDto: UpdateUserDto,
  ) {
    assertUserAccess(id, currentUser);

    let hashedPassword: string;
    if (updateUserDto.password) {
      hashedPassword = await this.hashingService.hash(updateUserDto.password);
    }

    const user = await this.usersRepository.preload({
      id,
      ...updateUserDto,
      ...(hashedPassword && { password: hashedPassword }),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.usersRepository.save(user);
  }

  async remove(id: number, currentUser: RequestUser, soft: boolean) {
    const user = await this.findOne(id);

    assertUserAccess(id, currentUser);

    if (currentUser.role !== Role.ADMIN && !soft) {
      throw new ForbiddenException('Forbidden resource');
    }

    return soft
      ? this.usersRepository.softRemove(user)
      : this.usersRepository.remove(user);
  }

  async recover(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOneOrFail({
      where: { email },
      withDeleted: true,
    });

    if (!user.isDeleted) {
      throw new ConflictException('User not deleted');
    }

    const isPasswordMatch = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.recover(user);

    return this.usersRepository.findOne({
      where: { email },
    });
  }
}
