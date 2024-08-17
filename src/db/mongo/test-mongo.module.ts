import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestConnectionConfig } from './configs';
import { ConfigModule } from '@nestjs/config';

// TODO may not be necessary
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TestConnectionConfig,
    }),
  ],
})
export class TestMongoModule {}
