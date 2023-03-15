import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';

import { JoiValidatonSchema } from './common/validators/joi.validator';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidatonSchema,
    }),
    UserModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
