import {
  JwtModuleOptions,
  JwtOptionsFactory,
} from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { BaseConfig } from '../../../shared/config';
import { BaseDto } from '../../../shared/dtos';
import { Expose } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

interface BaseEnvironmentVariables {
  AUTH_JWT_SECRET: string;
}

class EnvironmentVariables extends BaseDto implements BaseEnvironmentVariables {
  @Expose()
  @MinLength(16)
  @MaxLength(32)
  @IsNotEmpty()
  AUTH_JWT_SECRET: string;
}

@Injectable()
export class JwtConfigs
  extends BaseConfig<EnvironmentVariables>
  implements JwtOptionsFactory
{
  constructor(private configService: ConfigService<BaseEnvironmentVariables>) {
    super(
      {
        AUTH_JWT_SECRET: configService.get('AUTH_JWT_SECRET'),
      },
      EnvironmentVariables,
    );
  }

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configs.AUTH_JWT_SECRET,
    };
  }
}
