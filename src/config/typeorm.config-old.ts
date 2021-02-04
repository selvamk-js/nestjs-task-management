import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as config from 'config';

// const {
//   type,
//   host,
//   username,
//   port,
//   database,
//   password,
//   synchronize,
// } = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  //   type,
  //   host: process.env.DB_HOST || host,
  //   port: process.env.DB_PORT || port,
  //   username: process.env.DB_USERNAME || username,
  //   password: process.env.DB_PASSWORD || password,
  //   database: process.env.DB_DATABASE || database,
  //   entities: [`${__dirname}/../**/*.entity.ts`],
  //   synchronize,
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Admin@123',
  database: 'taskmanagement',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};
