import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userFound: UserEntity = await this.getUserByEmail(
      createUserDto.email,
    );

    if (userFound) {
      throw new ConflictException('The user already exists.');
    }

    return this.userRepository.save(createUserDto);
  }

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
        status: true,
      },
    });
  }

  getUsers(paginationDto: PaginationDto): Promise<UserEntity[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.userRepository.find({
      where: {
        status: true,
      },
      take: limit,
      skip: offset,
    });
  }

  async getUserById(id: string): Promise<UserEntity> {
    const userFound: UserEntity = await this.userRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userFound) {
      throw new NotFoundException(`The user with id ${id} has not been found.`);
    }

    return userFound;
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userFound: UserEntity = await this.userRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userFound) {
      throw new NotFoundException(`The user with id ${id} has not been found.`);
    }

    return this.userRepository.save({
      ...userFound,
      updateUserDto,
    });
  }

  async deleteUserById(id: string): Promise<UserEntity> {
    const userFound: UserEntity = await this.userRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userFound) {
      throw new NotFoundException(`The user with id ${id} has not been found.`);
    }

    return this.userRepository.save({
      ...userFound,
      status: false,
    });
  }
}
