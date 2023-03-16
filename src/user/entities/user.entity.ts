import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { RepositoryEntity } from '../../repository/entities/repository.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'text',
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
    name: 'avatar_url',
    nullable: true,
  })
  avatarUrl: string;

  @OneToMany(() => RepositoryEntity, (repository) => repository.author)
  repositories: RepositoryEntity[];

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
