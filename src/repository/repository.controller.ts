import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RepositoryService } from './repository.service';

import { Auth } from '../auth/decorators';

import { CreateRepositoryDto, UpdateRepositoryDto } from './dto';

import { PaginationDto } from '../common/dto/pagination.dto';

// import { ValidRoles } from '../auth/interfaces';

import { RepositoryEntity } from './entities/repository.entity';

@Controller('repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Post()
  @Auth()
  createRepository(
    @Body() createRepositoryDto: CreateRepositoryDto,
  ): Promise<RepositoryEntity> {
    return this.repositoryService.createRepository(createRepositoryDto);
  }

  @Get()
  getRepositories(
    @Query() paginationDto: PaginationDto,
  ): Promise<RepositoryEntity[]> {
    return this.repositoryService.getRepositories(paginationDto);
  }

  @Get(':id')
  getRepositoryById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RepositoryEntity> {
    return this.repositoryService.getRepositoryById(id);
  }

  @Patch(':id')
  @Auth()
  updateRepositoryById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRepositoryDto: UpdateRepositoryDto,
  ): Promise<RepositoryEntity> {
    return this.repositoryService.updateRepositoryById(id, updateRepositoryDto);
  }

  @Delete(':id')
  @Auth()
  deleteRepositoryById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RepositoryEntity> {
    return this.repositoryService.deleteRepositoryById(id);
  }
}
