import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { LoginUserDto, RegisterUserDto } from './dto';
import { UserEntity } from '../user/entities/user.entity';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const userFound: UserEntity = await this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        status: true,
        password: true,
      },
    });

    if (!userFound) {
      throw new UnauthorizedException('The email or password is incorrect.');
    }

    if (!bcrypt.compareSync(password, userFound.password)) {
      throw new UnauthorizedException('The email or password is incorrect.');
    }

    if (!userFound.status) {
      throw new UnauthorizedException(
        'The user is inactive, talk with an admin.',
      );
    }

    return {
      user: {
        id: userFound.id,
        email: userFound.email,
      },
      token: this.getJwtToken({
        id: userFound.id,
      }),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;

    const userFound: UserEntity = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userFound) {
      throw new ConflictException('The user already exists.');
    }

    const createdUser: UserEntity = await this.userRepository.save({
      ...registerUserDto,
      password: bcrypt.hashSync(password, 10),
    });

    return {
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
      token: this.getJwtToken({
        id: createdUser.id,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
