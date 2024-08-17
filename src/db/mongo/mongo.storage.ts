import { BaseStorage } from '../../shared/storage';
import { MongoEntity } from './entities';
import { Error, Model, Types } from 'mongoose';

/**
 * Class representing a generic MongoDB storage.
 * @template T The type of the entity to be stored.
 */

export class MongoStorage<T extends MongoEntity> extends BaseStorage<
  T,
  Types.ObjectId
> {
  protected entityModel: Model<T>;

  async create(data: Partial<T>): Promise<T> {
    return (await this.entityModel.create(data)).toObject();
  }

  async findById(id: Types.ObjectId): Promise<T | null> {
    return (await this.entityModel
      .findById(id)
      .select('-__v')
      .lean()
      .exec()) as T;
  }

  async update(id: Types.ObjectId, data: Partial<T>): Promise<T> {
    return (await this.entityModel
      .findOneAndUpdate({ _id: id }, data, { new: true })
      .lean()
      .select('-__v')
      .exec()) as T;
  }

  async delete(id: Types.ObjectId): Promise<void> {
    await this.entityModel.deleteOne({ _id: id }).exec();
  }
}

export class AlreadyExistsError extends Error {}
