import { RegistrationDto } from './registration.dto';
import { ValidationError } from '../../shared/dtos';

describe('Registration Dto', () => {
  const email = 'mail@example.com';
  const plainPassword = 'sZNB39bEejR5rFq6nxTGSm';

  describe('email', () => {
    it('Should allow valid email', () => {
      const data: RegistrationDto = {
        email,
        plainPassword,
      };

      const result = RegistrationDto.create(data);

      expect(result).toEqual({
        email,
        plainPassword,
      });
    });

    it('Should not allow blank email', () => {
      const data: RegistrationDto = {
        email: '',
        plainPassword,
      };

      expect(() => RegistrationDto.create(data)).toThrow(ValidationError);
    });

    it('Should not allow invalid email', () => {
      const data: RegistrationDto = {
        email: 'not-valid-email',
        plainPassword,
      };

      expect(() => RegistrationDto.create(data)).toThrow(ValidationError);
    });

    it('Should not allow too long email', () => {
      const data: RegistrationDto = {
        email: `${'long'.repeat(1e3)}@example.com`,
        plainPassword,
      };

      expect(() => RegistrationDto.create(data)).toThrow(ValidationError);
    });
  });

  describe('plainPassword', () => {
    it('Should allow valid password', () => {
      const data: RegistrationDto = {
        email,
        plainPassword,
      };

      const result = RegistrationDto.create(data);

      expect(result).toEqual({
        email,
        plainPassword,
      });
    });

    it('Should not allow if password too short', () => {
      const data: RegistrationDto = {
        email,
        plainPassword: '123',
      };

      expect(() => RegistrationDto.create(data)).toThrow(ValidationError);
    });

    it('Should not allow if password too long', () => {
      const data: RegistrationDto = {
        email,
        plainPassword: 'long'.repeat(1e3),
      };

      expect(() => RegistrationDto.create(data)).toThrow(ValidationError);
    });
  });
});
