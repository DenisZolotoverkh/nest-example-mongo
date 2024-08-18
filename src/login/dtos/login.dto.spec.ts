import { ValidationError } from '../../shared/dtos';
import { LoginDto } from './login.dto';

describe('Login Dto', () => {
  const email = 'mail@example.com';
  const plainPassword = 'sZNB39bEejR5rFq6nxTGSm';

  describe('email', () => {
    it('Should allow valid email', () => {
      const data: LoginDto = {
        email,
        plainPassword,
      };

      const result = LoginDto.create(data);

      expect(result).toEqual({
        email,
        plainPassword,
      });
    });

    it('Should not allow blank email', () => {
      const data: LoginDto = {
        email: '',
        plainPassword,
      };

      expect(() => LoginDto.create(data)).toThrow(ValidationError);
    });

    it('Should not allow invalid email', () => {
      const data: LoginDto = {
        email: 'not-valid-email',
        plainPassword,
      };

      expect(() => LoginDto.create(data)).toThrow(ValidationError);
    });

    it('Should not allow too long email', () => {
      const data: LoginDto = {
        email: `${'long'.repeat(1e3)}@example.com`,
        plainPassword,
      };

      expect(() => LoginDto.create(data)).toThrow(ValidationError);
    });
  });

  describe('plainPassword', () => {
    it('Should allow valid password', () => {
      const data: LoginDto = {
        email,
        plainPassword,
      };

      const result = LoginDto.create(data);

      expect(result).toEqual({
        email,
        plainPassword,
      });
    });

    it('Should not allow if password too short', () => {
      const data: LoginDto = {
        email,
        plainPassword: '123',
      };

      expect(() => LoginDto.create(data)).toThrow(ValidationError);
    });

    it('Should not allow if password too long', () => {
      const data: LoginDto = {
        email,
        plainPassword: 'long'.repeat(1e3),
      };

      expect(() => LoginDto.create(data)).toThrow(ValidationError);
    });
  });
});
