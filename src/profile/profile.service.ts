import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStorage } from '../user';
import { ProfileDto } from './dtos';
import { Types } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(private readonly userStorage: UserStorage) {}

  async getProfileById(userId: string): Promise<ProfileDto> {
    const user = await this.userStorage.findById(
      Types.ObjectId.createFromHexString(userId),
    );
    if (!user) throw new NotFoundException('User not found');

    return ProfileDto.create(user);
  }
}
