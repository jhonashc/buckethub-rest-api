import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userFound: User = await this.getUserByEmail(createUserDto.email);

    if (userFound) {
      throw new ConflictException('The user already exists.');
    }

    return this.userRepository.save(createUserDto);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
        status: true,
      },
    });
  }

  getUsers(paginationDto: PaginationDto): Promise<User[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.userRepository.find({
      where: {
        status: true,
      },
      take: limit,
      skip: offset,
    });
  }

  async getUserById(id: string): Promise<User> {
    const userFound: User = await this.userRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!userFound) {
      console.log('hola');
      throw new NotFoundException(`The user with id ${id} has not been found.`);
    }

    return userFound;
  }

  async updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userFound: User = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!userFound) {
      throw new NotFoundException(`The user with id ${id} has not been found.`);
    }

    await this.userRepository.save(userFound);

    return userFound;
  }

  async deleteUserById(id: string): Promise<User> {
    const userFound: User = await this.userRepository.preload({
      id,
      status: false,
    });

    if (!userFound) {
      throw new NotFoundException(`The user with id ${id} has not been found.`);
    }
    await this.userRepository.save(userFound);

    return userFound;
  }
}
