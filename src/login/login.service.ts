import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserStorage } from '../user';
import { LoginDto, RegistrationDto, TokenDto } from './dtos';
import { MessageDto } from '../shared/dtos';
import { JwtAuthService } from '../auth/jwt';

export class IncorrectPasswordError extends HttpException {
  constructor() {
    const message = 'Incorrect password';
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

@Injectable()
export class LoginService {
  constructor(
    private readonly userStorage: UserStorage,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async registerUser(dto: RegistrationDto): Promise<MessageDto> {
    await this.userStorage.create({
      email: dto.email,
      password: dto.plainPassword,
    });
    return MessageDto.create({
      message: 'Registration successful',
    });
  }

  async loginUser(dto: LoginDto): Promise<TokenDto> {
    const user = await this.userStorage.findByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');
    // TODO implement password service
    if (user.password != dto.plainPassword) throw new IncorrectPasswordError();

    const token = await this.jwtAuthService.generate(user._id.toHexString());
    return TokenDto.create({
      access: token,
    });
  }
}
