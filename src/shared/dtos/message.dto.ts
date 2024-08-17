import { BaseDto } from './base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

interface Message {
  message: string;
}

export class MessageDto extends BaseDto implements Message {
  @Expose()
  @ApiProperty({
    description: 'Message body',
    example: 'message body',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  message: string;
}
