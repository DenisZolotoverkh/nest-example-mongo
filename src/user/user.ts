import { BaseMongoEntity } from '../db/mongo/entities';

export interface User extends BaseMongoEntity {
  email: string;
  password: string;
}
