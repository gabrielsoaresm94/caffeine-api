import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../shared/guards/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Token não encontrado!',
      });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as ITokenPayload;

      req.user = {
        id: sub,
      };

      return next();
    } catch {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Token inválido!',
      });
    }
  }
}
