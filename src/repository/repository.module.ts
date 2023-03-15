import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryService } from './repository.service';
import { RepositoryController } from './repository.controller';
import { Repository } from './entities/repository.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repository])],
  controllers: [RepositoryController],
  providers: [RepositoryService],
})
export class RepositoryModule {}
