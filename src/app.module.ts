import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from './auth/jwt';
import { LoginModule } from './login';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    JwtAuthModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
