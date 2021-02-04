import { Global, HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers = [ConfigService, ValidatorService, GeneratorService];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('server.jwtSecretKey'),
        signOptions: {
          expiresIn: configService.get<number>('server.jwtExpiration'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
