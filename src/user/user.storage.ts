import { MongoStorage } from '../db/mongo';
import { UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserStorage extends MongoStorage<UserEntity> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>) {
    super();
    this.entityModel = userModel;
  }
}