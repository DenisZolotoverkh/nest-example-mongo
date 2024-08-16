import { BaseMongoEntity, MongoEntity } from '../entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export interface BaseMongoEntityMock extends BaseMongoEntity {
  mockProperty: string;
}

@Schema()
export class MongoEntityMock
  extends MongoEntity
  implements BaseMongoEntityMock {
  @Prop({ type: String })
  mockProperty: string;
}

export const MongoEntityMockSchema =
  SchemaFactory.createForClass(MongoEntityMock);

export const mongoEntityMockExample: BaseMongoEntityMock = {
  _id: new Types.ObjectId(),
  mockProperty: 'example',
  createdAt: new Date(),
};
