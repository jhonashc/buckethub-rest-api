import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';

import { RepositoryEntity } from './entities/repository.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryEntity]), AuthModule],
  exports: [TypeOrmModule],
  controllers: [RepositoryController],
  providers: [RepositoryService],
})
export class RepositoryModule {}
