import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { MongoModule } from '../db/mongo';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RegistrationDto } from './dtos';
import { UserEntity, userEntityExample } from '../user';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { TestMongoModule } from '../db/mongo/test-mongo.module';

describe('Login e2e', () => {
  let app: INestApplication;
  let userModel: Model<UserEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(MongoModule)
      .useModule(TestMongoModule)
      .compile();

    app = module.createNestApplication();
    await app.init();

    userModel = module.get<Model<UserEntity>>(getModelToken(UserEntity.name));
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  describe('register', () => {
    it('Should register a new user', async () => {
      const data: RegistrationDto = {
        email: userEntityExample.email,
        plainPassword: 'xTs6vpgnC32K4HQXRtbe7P',
      };

      const result = await request(app.getHttpServer())
        .post('/auth/register')
        .send(data);

      expect(result.status).toBe(HttpStatus.CREATED);
      expect(result.body).toEqual({
        message: 'Registration successful',
      });
      expect(await userModel.findOne({ email: data.email })).not.toBe(null);
    });

    it('Should not register a new user if one with the same email already exists', async () => {
      await userModel.create(userEntityExample);
      const data: RegistrationDto = {
        email: userEntityExample.email,
        plainPassword: 'xTs6vpgnC32K4HQXRtbe7P',
      };

      const result = await request(app.getHttpServer())
        .post('/auth/register')
        .send(data);

      expect(result.status).toBe(HttpStatus.CREATED);
      expect(result.body).toEqual({
        message: 'Registration successful',
      });
    });
  });
});
