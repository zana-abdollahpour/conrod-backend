import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DefaultPageSizes } from 'common/common.config';
import { PaginationDto } from 'common/dto/pagination.dto';
import { HashingService } from 'iam/hashing/hashing.abstract.service';
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
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: { items: true, payment: true } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
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

  async remove(id: number, soft: boolean) {
    const user = await this.findOne(id);

    return soft
      ? this.usersRepository.softRemove(user)
      : this.usersRepository.remove(user);
  }

  async recover(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isDeleted) {
      throw new ConflictException('User not deleted');
    }

    await this.usersRepository.recover(user);

    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
