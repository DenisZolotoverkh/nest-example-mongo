import { RegistrationService } from './registration.service';
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { userEntityExample, UserStorage } from '../user';
import { RegistrationDto } from './dtos';

describe('Registration service', () => {
  let service: RegistrationService;

  const mockUserStorage = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserStorage,
          useValue: mockUserStorage,
        },
        RegistrationService,
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

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
