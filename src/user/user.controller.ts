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

import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers(@Query() paginationDto: PaginationDto): Promise<User[]> {
    return this.userService.getUsers(paginationDto);
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateUserById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
