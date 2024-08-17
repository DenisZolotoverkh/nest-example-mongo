import { AlreadyExistsError, MongoStorage } from '../db/mongo';
import { UserEntity } from './entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class UserStorage extends MongoStorage<UserEntity> {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {
    super();
    this.entityModel = userModel;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.entityModel
      .findOne({
        email,
      })
      .select('-__v')
      .lean()
      .exec();
  }

  async create(data: Partial<UserEntity>): Promise<UserEntity> {
    if (await this.findByEmail(data.email))
      throw new AlreadyExistsError(`User with ${data.email} already exists`);

    return await super.create(data);
  }
}
