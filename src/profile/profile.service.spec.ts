import { ProfileService } from './profile.service';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityExample, UserStorage } from '../user';
import { jest } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

describe('Profile service', () => {
  let service: ProfileService;
  const mockUserStorage = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserStorage,
          useValue: mockUserStorage,
        },
        ProfileService,
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfileById', () => {
    it('Should return user profile if exists', async () => {
      jest
        .spyOn(mockUserStorage, 'findById')
        .mockReturnValue(userEntityExample);
      const id = userEntityExample._id.toHexString();

      const result = await service.getProfileById(id);

      expect(result).toHaveProperty('email', userEntityExample.email);
      expect(result).toHaveProperty('createdAt', userEntityExample.createdAt);
    });

    it('Should raise not found error if user does not exist', async () => {
      jest.spyOn(mockUserStorage, 'findById').mockReturnValue(null);
      const id = new Types.ObjectId().toHexString();

      await expect(async () => service.getProfileById(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
