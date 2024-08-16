import { Document, Types } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '../../../shared/storage';

export interface BaseMongoEntity extends BaseEntity {
  _id: Types.ObjectId;
  createdAt: Date;
}

export class MongoEntity extends Document implements BaseMongoEntity {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id: Types.ObjectId;

  @Prop({ default: () => new Date(), type: Date })
  createdAt: Date;
}

export const MongoSchema = SchemaFactory.createForClass(MongoEntity);
