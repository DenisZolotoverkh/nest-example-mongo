import { JwtAuthService } from './jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';

describe('JwtAuthService', () => {
  let service: JwtAuthService;
  const mockJwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<JwtAuthService>(JwtAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generate', () => {
    it('should generate a token with userId as subject', async () => {
      const userId = '123';
      const token = 'mockToken';
      jest.spyOn(mockJwtService, 'signAsync').mockReturnValue(token);

      const result = await service.generate(userId);

      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: userId });
      expect(result).toBe(token);
    });
  });

  describe('validate', () => {
    it('should validate a token and return the userId', async () => {
      const token = 'mockToken';
      const tokenData = { sub: '123' };
      jest.spyOn(mockJwtService, 'verifyAsync').mockReturnValue(tokenData);

      const result = await service.validate(token);

      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(token);
      expect(result).toBe(tokenData.sub);
    });

    it('should throw an error if the token is invalid', async () => {
      const token = 'invalidToken';
      jest.spyOn(mockJwtService, 'verifyAsync').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.validate(token)).rejects.toThrow('Invalid token');
      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(token);
    });
  });
});
