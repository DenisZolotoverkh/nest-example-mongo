import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dtos';
import { MessageDto } from '../shared/dtos';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('')
  @ApiCreatedResponse({ description: 'Registration successful' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async register(@Body() dto: RegistrationDto): Promise<MessageDto> {
    return await this.registrationService.registerUser(dto);
  }
}
