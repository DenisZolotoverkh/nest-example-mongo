import { BaseDto } from '../../shared/dtos';
import { User, userEntityExample } from '../../user';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

interface Profile extends Pick<User, 'email' | 'createdAt'> {}

export class ProfileDto extends BaseDto implements Profile {
  @Expose()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: userEntityExample.email,
    description: 'Email',
  })
  email: string;

  @Expose()
  @IsDate()
  @ApiProperty({
    example: userEntityExample.createdAt,
    description: 'User creation date',
  })
  createdAt: Date;
}
