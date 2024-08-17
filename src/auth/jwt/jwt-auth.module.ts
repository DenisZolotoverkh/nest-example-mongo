import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigs } from './configs';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigService],
      useClass: JwtConfigs,
    }),
  ],
})
export class JwtAuthModule {}
