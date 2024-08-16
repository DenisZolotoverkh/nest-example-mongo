import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoStorage } from '../mongo.storage';
import { MongoEntityMock } from './mongo.entity.mock';

export class MongoStorageMock extends MongoStorage<MongoEntityMock> {
  constructor(
    @InjectModel(MongoEntityMock.name)
    private readonly userModel: Model<MongoEntityMock>,
  ) {
    super();
    this.entityModel = userModel;
  }
}
