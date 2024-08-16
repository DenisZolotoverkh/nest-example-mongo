import { BaseMongoEntity } from '../db/mongo/entities/mongo.entity';

export interface User extends BaseMongoEntity {
  email: string;
}
