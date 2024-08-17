import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { ProfileService } from './profile.service';

@Module({
  imports: [UserModule],
  exports: [ProfileService],
  providers: [ProfileService],
})
export class ProfileModule {}
