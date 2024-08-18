import { User, userEntityExample } from '../../user';
import { BaseDto } from '../../shared/dtos';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

interface Login extends Pick<User, 'email'> {
  plainPassword: string;
}

export class LoginDto extends BaseDto implements Login {
  @Expose()
  @ApiProperty({
    description: 'User email',
    example: userEntityExample.email,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(256)
  email: string;

  @Expose()
  @ApiProperty({
    description: 'User password in plain form',
    example: '*******',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(24)
  plainPassword: string;
}
