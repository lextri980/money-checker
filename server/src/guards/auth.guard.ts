import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtErrorConstant } from 'src/constants';

declare module 'Express' {
  interface Request {
    user?: {
      userId: string;
      email: string;
      name: string;
      phoneNumber?: string;
      address?: string;
      role: number;
    };
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Access token not found!');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_JWT,
      });
      request['user'] = payload;
    } catch (error) {
      if (error.message === jwtErrorConstant.EXPIRED) {
        throw new UnauthorizedException('Session expired!');
      } else {
        throw new UnauthorizedException('Invalid token!');
      }
    }
    return request.user ? true : false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
