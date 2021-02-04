import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuartion';
import { validationSchema } from './config/validation';
// import { SharedModule } from './shared/shared.module';
// import { ConfigService } from './shared/services/config.service';
// import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
      envFilePath: path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('database.host'),
        port: +configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        extra: {
          trustedConnection: true,
          options: {
            encrypt: true,
            enableArithAbort: true,
          },
        },
        entities: [`${__dirname}/**/*.entity{.js,.ts}`],
        synchronize: process.env.NODE_ENV === 'development' || false,
      }),
      inject: [ConfigService],
    }),

    // TypeOrmModule.forRootAsync({
    //   imports: [SharedModule],
    //   useFactory: async (configService: ConfigService) =>
    //     configService.typeOrmConfig,
    //   inject: [ConfigService],
    // }),

    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
