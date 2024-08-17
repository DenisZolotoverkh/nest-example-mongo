import { Injectable } from '@nestjs/common';
import { UserStorage } from '../user';
import { RegistrationDto } from './dtos';
import { MessageDto } from '../shared/dtos';

@Injectable()
export class RegistrationService {
  constructor(private readonly userStorage: UserStorage) {}

  async registerUser(dto: RegistrationDto): Promise<MessageDto> {
    await this.userStorage.create({
      email: dto.email,
      password: dto.plainPassword,
    });
    return MessageDto.create({
      message: 'Registration successful',
    });
  }
}
