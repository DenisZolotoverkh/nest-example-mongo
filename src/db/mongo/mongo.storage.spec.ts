import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MongoEntityMock,
  mongoEntityMockExample,
  MongoEntityMockSchema,
  MongoStorageMock,
} from './mock';
import { TestConnectionConfig } from './configs';
import { ConfigModule } from '@nestjs/config';

describe('Mongo Storage', () => {
  let storage: MongoStorageMock;
  let model: Model<MongoEntityMock>;
  const entity = {
    ...mongoEntityMockExample,
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
          { name: MongoEntityMock.name, schema: MongoEntityMockSchema },
        ]),
      ],
      providers: [MongoStorageMock],
    }).compile();

    storage = module.get<MongoStorageMock>(MongoStorageMock);
    model = module.get<Model<MongoEntityMock>>(
      getModelToken(MongoEntityMock.name),
    );
  });

  afterEach(async () => {
    await model.deleteMany({});
  });

  it('Should be defined', () => {
    expect(storage).toBeDefined();
  });

  describe('create', () => {
    it('Should create entity', async () => {
      const mockProperty = entity.mockProperty;
      const data: Partial<MongoEntityMock> = {
        mockProperty,
      };
      const result = await storage.create(data);

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('mockProperty', mockProperty);
      expect(model.findById(result._id)).not.toBe(null);
    });
  });

  describe('findById', () => {
    beforeEach(async () => {
      await model.create(entity);
    });

    it('Should find existing entity by id', async () => {
      const result = await storage.findById(entity._id);

      expect(result).toEqual(entity);
    });

    it('Should return null if does not exist', async () => {
      await model.deleteOne({ _id: entity._id }).exec();

      const result = await storage.findById(entity._id);

      expect(result).toBe(null);
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      await model.create(entity);
    });

    it('Should update by id', async () => {
      const newValue = 'new value';
      const data: Partial<MongoEntityMock> = {
        mockProperty: newValue,
      };

      const result = await storage.update(entity._id, data);

      expect(result).toEqual({
        ...entity,
        mockProperty: newValue,
      });
      expect(await model.findOne({ mockProperty: newValue })).not.toBe(null);
    });
  });
  describe('delete', () => {
    beforeEach(async () => {
      await model.create(entity);
    });

    it('Should delete by id', async () => {
      await model.deleteOne({ _id: entity._id });

      await storage.delete(entity._id);

      expect(await model.findById(entity._id).exec()).toBe(null);
    });
  });
});
