import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigs } from './configs';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigs,
    }),
  ],
  providers: [
    JwtAuthGuard,
    JwtAuthService,
  ],
  exports: [
    JwtAuthGuard,
  ],
})
export class JwtAuthModule {
}
