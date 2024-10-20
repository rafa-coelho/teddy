import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './config/database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
        autoLoadEntities: true,
      }),
    }),
    CustomerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
