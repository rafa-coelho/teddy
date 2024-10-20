import 'reflect-metadata';
import { DataSource } from 'typeorm';
import appConfig from '../app.config';
import path from 'path';

const isCompiled = __filename.endsWith('.js');

const dataSourceOptions = {
  type: appConfig.db.type as any,
  host: appConfig.db.host,
  port: appConfig.db.port,
  username: appConfig.db.username,
  password: appConfig.db.password,
  database: appConfig.db.name,
  logging: appConfig.nodeEnv === 'development',
  entities: [
    isCompiled
      ? path.resolve('dist/modules/**/*.entity.js')
      : path.resolve('src/modules/**/*.entity.ts'),
  ],
  migrations: [
    isCompiled
      ? path.resolve('dist/config/database/migrations/*.js')
      : path.resolve('src/config/database/migrations/*.ts'),
  ],
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
