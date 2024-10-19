import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './filters/any-exception.filter';
import appConfig from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AnyExceptionFilter());

  await app.listen(appConfig.port);
}
bootstrap();
