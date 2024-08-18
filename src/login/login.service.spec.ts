import { IncorrectPasswordError, LoginService } from './login.service';
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityExample, UserStorage } from '../user';
import { LoginDto, RegistrationDto } from './dtos';
import { JwtAuthService } from '../auth/jwt';
import { NotFoundException } from '@nestjs/common';

describe('Registration service', () => {
  let service: LoginService;

  const mockUserStorage = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };
  const mockJwtAuthService = {
    generate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserStorage,
          useValue: mockUserStorage,
        },
        {
          provide: JwtAuthService,
          useValue: mockJwtAuthService,
        },
        LoginService,
      ],
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('Should register a user', async () => {
      jest.spyOn(mockUserStorage, 'create').mockReturnValue(userEntityExample);
      const dto: RegistrationDto = {
        email: userEntityExample.email,
        plainPassword: 'xTs6vpgnC32K4HQXRtbe7P',
      };

      const result = await service.registerUser(dto);

      expect(result).toEqual({
        message: 'Registration successful',
      });
    });
  });

  describe('loginUser', () => {
    it('Should generate a token if password is correct', async () => {
      const token = 'mock-token';
      jest.spyOn(mockJwtAuthService, 'generate').mockReturnValue(token);
      jest
        .spyOn(mockUserStorage, 'findByEmail')
        .mockReturnValue(userEntityExample);
      const dto: LoginDto = {
        email: userEntityExample.email,
        plainPassword: userEntityExample.password,
      };

      const result = await service.loginUser(dto);

      expect(result).toEqual({
        access: token,
      });
      expect(mockUserStorage.findByEmail).toHaveBeenCalledWith(
        userEntityExample.email,
      );
      expect(mockJwtAuthService.generate).toHaveBeenCalledWith(
        userEntityExample._id.toHexString(),
      );
    });

    it('Should throw error if user with provided email does not exist', async () => {
      const email = 'non-existent@example.com';
      jest.spyOn(mockUserStorage, 'findByEmail').mockReturnValue(null);
      const dto: LoginDto = {
        email,
        plainPassword: userEntityExample.password,
      };

      await expect(service.loginUser(dto)).rejects.toThrow(NotFoundException);

      expect(mockUserStorage.findByEmail).toHaveBeenCalledWith(email);
      expect(mockJwtAuthService.generate).not.toHaveBeenCalled();
    });

    it('Should throw error if provided password is incorrect', async () => {
      jest
        .spyOn(mockUserStorage, 'findByEmail')
        .mockReturnValue(userEntityExample);
      const dto: LoginDto = {
        email: userEntityExample.email,
        plainPassword: 'incorrect password',
      };

      await expect(service.loginUser(dto)).rejects.toThrow(
        IncorrectPasswordError,
      );

      expect(mockUserStorage.findByEmail).toHaveBeenCalledWith(
        userEntityExample.email,
      );
      expect(mockJwtAuthService.generate).not.toHaveBeenCalled();
    });
  });
});
