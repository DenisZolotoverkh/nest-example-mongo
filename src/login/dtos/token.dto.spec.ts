import { TokenDto } from './token.dto';
import { ValidationError } from '../../shared/dtos';

describe('Token Dto', () => {
  const access = 'access-token';

  describe('access', () => {
    it('Should allow valid token', () => {
      const data: TokenDto = {
        access,
      };

      const result = TokenDto.create(data);

      expect(result).toEqual({
        access,
      });
    });

    it('Should not allow blank token', () => {
      const data: TokenDto = {
        access: '',
      };

      expect(() => TokenDto.create(data)).toThrow(ValidationError);
    });
  });
});
