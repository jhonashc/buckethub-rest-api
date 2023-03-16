import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

import { Auth } from '../auth/decorators';

import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { ValidRoles } from '../auth/interfaces';

import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth(ValidRoles.admin)
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers(@Query() paginationDto: PaginationDto): Promise<UserEntity[]> {
    return this.userService.getUsers(paginationDto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userService.deleteUserById(id);
  }
}
