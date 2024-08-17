import { JwtAuthGuard } from './jwt-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { ExecutionContext } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  const mockJwtAuthService = {
    validate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: JwtAuthService,
          useValue: mockJwtAuthService,
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('Should allow access if provided token is correct', async () => {
    const userId = '123';
    const token = 'token';
    jest.spyOn(mockJwtAuthService, 'validate').mockReturnValue(userId);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      }),
    };

    const result = await guard.canActivate(<ExecutionContext>context);

    expect(result).toBe(true);
    expect(mockJwtAuthService.validate).toHaveBeenCalledWith(token);
  });

  it('Should not allow access if provided token is wrong type', async () => {
    const userId = '123';
    const token = 'token';
    jest.spyOn(mockJwtAuthService, 'validate').mockReturnValue(userId);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Basic ${token}`,
          },
        }),
      }),
    };

    const result = await guard.canActivate(<ExecutionContext>context);

    expect(result).toBe(false);
    expect(mockJwtAuthService.validate).not.toHaveBeenCalled();
  });

  it('Should not allow access if not token is provided', async () => {
    const userId = '123';
    jest.spyOn(mockJwtAuthService, 'validate').mockReturnValue(userId);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer`,
          },
        }),
      }),
    };

    const result = await guard.canActivate(<ExecutionContext>context);

    expect(result).toBe(false);
    expect(mockJwtAuthService.validate).not.toHaveBeenCalled();
  });

  it('Should not allow access if auth header is not provided', async () => {
    const userId = '123';
    jest.spyOn(mockJwtAuthService, 'validate').mockReturnValue(userId);

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    };

    const result = await guard.canActivate(<ExecutionContext>context);

    expect(result).toBe(false);
    expect(mockJwtAuthService.validate).not.toHaveBeenCalled();
  });
});
