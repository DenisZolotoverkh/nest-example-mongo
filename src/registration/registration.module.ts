import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [UserModule],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
