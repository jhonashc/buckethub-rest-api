import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, In, Repository } from 'typeorm';

import { CreateRepositoryDto, UpdateRepositoryDto } from './dto';
import { PaginationDto } from '../common/dto/pagination.dto';

import { RepositoryEntity, Status } from './entities/repository.entity';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repository: Repository<RepositoryEntity>,
  ) {}

  async createRepository(
    createRepositoryDto: CreateRepositoryDto,
  ): Promise<RepositoryEntity> {
    const repositoryFound: RepositoryEntity = await this.repository.findOne({
      where: {
        title: createRepositoryDto.title,
        status: Any([Status.PENDING, Status.ACCEPTED]),
      },
    });

    if (repositoryFound) {
      throw new ConflictException(
        `The repository with title ${repositoryFound.title} already exits.`,
      );
    }

    return this.repository.save(createRepositoryDto);
  }

  getRepositories(paginationDto: PaginationDto): Promise<RepositoryEntity[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.repository.find({
      where: {
        status: In([Status.PENDING, Status.ACCEPTED]),
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: offset,
    });
  }

  async getRepositoryById(id: string): Promise<RepositoryEntity> {
    const repositoryFound: RepositoryEntity = await this.repository.findOne({
      where: {
        id,
        status: Any([Status.PENDING, Status.ACCEPTED]),
      },
    });

    if (!repositoryFound) {
      throw new NotFoundException(
        `The repository with id ${id} has not been found.`,
      );
    }

    return repositoryFound;
  }

  async updateRepositoryById(
    id: string,
    updateRepositoryDto: UpdateRepositoryDto,
  ): Promise<RepositoryEntity> {
    const repositoryFound: RepositoryEntity = await this.repository.findOne({
      where: {
        id,
        status: In([Status.PENDING, Status.ACCEPTED, Status.DECLINED]),
      },
    });

    if (!repositoryFound) {
      throw new NotFoundException(
        `The repository with id ${id} has not been found.`,
      );
    }

    return this.repository.save({
      ...repositoryFound,
      ...updateRepositoryDto,
    });
  }

  async deleteRepositoryById(id: string): Promise<RepositoryEntity> {
    const repositoryFound: RepositoryEntity = await this.repository.findOne({
      where: {
        id,
        status: In([Status.PENDING, Status.ACCEPTED, Status.DECLINED]),
      },
    });

    if (!repositoryFound) {
      throw new NotFoundException(
        `The repository with id ${id} has not been found.`,
      );
    }

    return this.repository.save({
      ...repositoryFound,
      status: Status.DELETED,
    });
  }
}
