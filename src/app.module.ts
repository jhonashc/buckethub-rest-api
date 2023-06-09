import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { RepositoryModule } from './repository/repository.module';
import { AuthModule } from './auth/auth.module';

import { JoiValidatonSchema } from './common/validators/joi.validator';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidatonSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CommonModule,
    RepositoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
