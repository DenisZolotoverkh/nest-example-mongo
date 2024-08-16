import { BaseEntity } from '../shared/storage';
import { BaseMongoEntity } from '../db/mongo';

export interface User extends BaseMongoEntity {
  email: string;
}