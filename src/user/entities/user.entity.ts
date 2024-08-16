import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user';
import { Types } from 'mongoose';
import { MongoEntity } from '../../db/mongo/entities';

@Schema({ collection: 'user' })
export class UserEntity extends MongoEntity implements User {
  @Prop({ required: true, type: String })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

export const userEntityExample: User = {
  _id: new Types.ObjectId(),
  email: 'mail@example.com',
  createdAt: new Date(),
};
