import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  private getTokenFromHeader(request: Request): string | null {
    const authHeader =
      request.headers['authorization'] ||
      request.headers['Authorization'] ||
      null;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request);
    if (!token) return false;

    try {
      request.userId = await this.jwtAuthService.validate(token);
      return true;
    } catch {
      return false;
    }
  }
}
