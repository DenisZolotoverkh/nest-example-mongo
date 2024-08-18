import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto, RegistrationDto, TokenDto } from './dtos';
import { MessageDto } from '../shared/dtos';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Registration')
@Controller('auth')
export class LoginController {
  constructor(private readonly registrationService: LoginService) {}

  @Post('registration')
  @ApiCreatedResponse({ description: 'Registration successful' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async register(@Body() dto: RegistrationDto): Promise<MessageDto> {
    return await this.registrationService.registerUser(dto);
  }

  @Post('token')
  @ApiCreatedResponse({ description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiUnauthorizedResponse({ description: 'Incorrect password' })
  async token(@Body() dto: LoginDto): Promise<TokenDto> {
    return await this.registrationService.loginUser(dto);
  }
}
