import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generate(userId: string): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
    });
  }

  async validate(token: string): Promise<string> {
    const tokenData = await this.jwtService.verifyAsync(token);
    return tokenData.sub;
  }
}
