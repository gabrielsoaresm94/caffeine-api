import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Post('signup')
  @ApiOperation({ tags: ['Autenticação'], summary: 'Cadastra gerente' })
  signUp(@Res() res: Response): Response {
    return res.status(HttpStatus.CREATED).json({
      message: 'Cadastra gerente!',
    });
  }

  @Post('signin')
  @ApiOperation({ tags: ['Autenticação'], summary: 'Login' })
  signIn(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Login!',
    });
  }
}
