import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AnyExceptionFilter } from './filters/any-exception.filter';
import appConfig from './config/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalFilters(new AnyExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('API de Clientes')
    .setDescription('Documentação da API de gerenciamento de clientes')
    .setVersion('1.0')
    .addTag('customers')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
