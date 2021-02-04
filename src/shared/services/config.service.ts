import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

export class ConfigService {
  constructor() {
    const envNode = this.nodeEnv;
    dotenv.config({
      path: `.env.${envNode}`,
    });

    // Replace \\n with \n to support multiline strings in AWS
    /*eslint-disable */
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
    /* eslint-enable */
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [`${__dirname}/**/*.entity{.js,.ts}`];
    // const migrations = [`${__dirname}/../../migrations/*{.ts,.js}`];

    return {
      entities,
      keepConnectionAlive: true,
      type: 'mssql',
      host: this.get('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.get('DB_USERNAME'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_DATABASE'),
      //   migrationsRun: true,
      logging: this.nodeEnv === 'development',
      synchronize: this.nodeEnv === 'development',
      extra: {
        trustedConnection: true,
        options: {
          encrypt: true,
          enableArithAbort: true,
        },
      },
    };
  }
}
