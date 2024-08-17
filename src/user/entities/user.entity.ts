import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user';
import { Types } from 'mongoose';
import { MongoEntity } from '../../db/mongo/entities';

@Schema({ collection: 'user' })
export class UserEntity extends MongoEntity implements User {
  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
UserSchema.index({ email: 1 }, { unique: true });

export const userEntityExample: User = {
  _id: new Types.ObjectId(),
  email: 'mail@example.com',
  password: 'mockPassword',
  createdAt: new Date(),
};
