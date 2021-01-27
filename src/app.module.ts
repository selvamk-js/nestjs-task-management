import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';
import configuration from './config/configuartion';
import { validationSchema } from './config/validation';
// import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
      envFilePath: path.join(
        process.cwd(),
        `.env.${process.env.NODE_ENV || 'development'}`,
      ),
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [`${__dirname}/**/*.entity{.js,.ts}`],
        synchronize: process.env.NODE_ENV === 'development' || false,
      }),
      inject: [ConfigService],
    }),

    TasksModule,
    AuthModule,
    SharedModule,
  ],
})
export class AppModule {}
