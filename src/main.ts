import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const globalPrefix = 'api';
  const port = config.get<number>('PORT');
  const environment = config.get<string>('NODE_ENV');

  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    Logger.log(`🚀 App running on port ${port}`);
    Logger.log(`Running in ${environment}`);
  });
}
bootstrap();
