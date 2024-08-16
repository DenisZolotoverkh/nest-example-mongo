import { Model } from 'mongoose';
import { UserStorage } from './user.storage';
import { UserEntity, UserSchema } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { TestConnectionConfig } from '../db/mongo/configs';

describe('User Storage', () => {
  let storage: UserStorage;
  let model: Model<UserEntity>;

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
});
