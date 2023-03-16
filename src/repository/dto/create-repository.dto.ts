import { IsNotEmpty, IsString, IsObject, IsOptional } from 'class-validator';

import { UserEntity } from '../../user/entities/user.entity';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsObject()
  @IsNotEmpty()
  author: UserEntity;
}
