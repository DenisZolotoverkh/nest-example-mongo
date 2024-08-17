import { Model } from 'mongoose';
import { UserStorage } from './user.storage';
import { UserEntity, userEntityExample, UserSchema } from './entities';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { TestConnectionConfig } from '../db/mongo/configs';
import { AlreadyExistsError } from '../db/mongo';

describe('User Storage', () => {
  let storage: UserStorage;
  let model: Model<UserEntity>;
  const entity = {
    ...userEntityExample,
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TestConnectionConfig,
        }),
        MongooseModule.forFeature([
          { name: UserEntity.name, schema: UserSchema },
        ]),
      ],
      providers: [UserStorage],
    }).compile();

    storage = module.get<UserStorage>(UserStorage);
    model = module.get<Model<UserEntity>>(getModelToken(UserEntity.name));
  });

  afterEach(async () => {
    await model.deleteMany({});
  });

  it('Should be defined', () => {
    expect(storage).toBeDefined();
  });

  describe('findByEmail', () => {
    beforeEach(async () => {
      await model.create(entity);
    });

    it('Should find user by email', async () => {
      const result = await storage.findByEmail(entity.email);

      expect(result).toEqual(entity);
    });

    it('Should not find user by email if it does not exist', async () => {
      await model.deleteOne({ email: entity.email });

      const result = await storage.findByEmail(entity.email);

      expect(result).toBe(null);
    });
  });

  describe('create', () => {
    it('Should create user', async () => {
      const data: Partial<UserEntity> = {
        email: entity.email,
        password: entity.password,
      };

      const result = await storage.create(data);

      expect(result).toHaveProperty('email', entity.email);
      expect(result).toHaveProperty('password', entity.password);
      expect(model.findById(result._id)).not.toBe(null);
    });

    it('Should throw error if user with the exact email already exists', async () => {
      await storage.create(entity);

      const data: Partial<UserEntity> = {
        email: entity.email,
        password: entity.password,
      };

      await expect(storage.create(data)).rejects.toThrow(AlreadyExistsError);
    });
  });
});
