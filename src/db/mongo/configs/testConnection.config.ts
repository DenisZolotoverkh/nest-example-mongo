import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { BaseDto } from '../../../shared/dtos';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseConfig } from '../../../shared/config';
import { IsMongoUri } from '../../../shared/validators';


interface BaseEnvironmentVariables {
  DB_MONGO_URI_TEST: string;
}

class EnvironmentVariables extends BaseDto<BaseEnvironmentVariables> implements BaseEnvironmentVariables {
  @Expose()
  @IsMongoUri()
  @IsNotEmpty()
  DB_MONGO_URI_TEST: string;
}

@Injectable()
export class TestConnectionConfig extends BaseConfig<EnvironmentVariables> implements MongooseOptionsFactory {
  constructor(private configService: ConfigService<BaseEnvironmentVariables>) {
    super({
      DB_MONGO_URI_TEST: configService.get('DB_MONGO_URI_TEST'),
    }, EnvironmentVariables);
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configs.DB_MONGO_URI_TEST,
    };
  }
}