import { BaseDto } from '../../shared/dtos';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

interface Token {
  access: string;
}

export class TokenDto extends BaseDto implements Token {
  @Expose()
  @ApiProperty({
    description: 'Access token',
  })
  @IsString()
  @IsNotEmpty()
  access;
}
