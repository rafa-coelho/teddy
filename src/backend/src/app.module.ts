import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: appConfig.db.type,
      host: appConfig.db.host,
      port: appConfig.db.port,
      username: appConfig.db.username,
      password: appConfig.db.password,
      database: appConfig.db.name,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: appConfig.nodeEnv === 'development',
    }),
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
