import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtAuthModule } from '../auth/jwt';

@Module({
  imports: [UserModule, JwtAuthModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
