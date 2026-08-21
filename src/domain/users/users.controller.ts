import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { IdDto } from 'common/dto/id.dto';
import { RemoveDto } from 'common/dto/remove.dto';
import { CurrentUser } from 'iam/authentication/decorators/current-user.decorator';
import { Public } from 'iam/authentication/decorators/public.decorator';
import { LoginDto } from 'iam/authentication/dto/login.dto';
import type { RequestUser } from 'iam/authentication/interfaces/request-user.interface';
import { Roles } from 'iam/authorization/decorators/roles.decorator';
import { Role } from 'iam/authorization/enum/roles.enum';
import { PaginationDto } from 'querying/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Public()
  @Patch('recover')
  recover(@Body() loginDto: LoginDto) {
    return this.usersService.recover(loginDto);
  }

  @Roles(Role.MANAGER, Role.ADMIN)
  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param() { id }: IdDto,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.usersService.update(id, currentUser, updateUserDto);
  }

  @Delete(':id')
  remove(
    @Param() { id }: IdDto,
    @Query() { soft }: RemoveDto,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.usersService.remove(id, currentUser, soft);
  }
}
