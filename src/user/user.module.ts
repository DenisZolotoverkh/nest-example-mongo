import { Module } from '@nestjs/common';
import { MongoModule } from '../db/mongo';
import { UserStorage } from './user.storage';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
    ]),
  ],
  providers: [UserStorage],
  exports: [UserStorage],
})
export class UserModule {
}