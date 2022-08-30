import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { UsersUseCase } from 'src/core/usecases/user.usecase';
import { createHash, compareHash } from 'src/shared/helpers';
import { IUserData } from 'src/core/entities/users/user.data';
import { Role } from 'src/shared/guards/role.enum';
import { User } from 'src/core/entities/users/user.entity';
import { CreateManagerValidator } from '../validators/users/create-manager.validator';
import authConfig from 'src/shared/guards/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersUseCase: UsersUseCase) {}

  @Post('signup')
  @ApiOperation({ tags: ['Autenticação'], summary: 'Cadastra gerente' })
  async signUp(
    @Body() body: CreateManagerValidator,
    @Res() res: Response,
  ): Promise<Response> {
    const manager = body;
    const managerId = uuid();

    const findUser = await this.usersUseCase.findUserByEmail(manager.email);
    if (findUser) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Usuário já foi cadastrado na plataforma!',
      });
    }

    manager.password = await createHash(manager.password.toString());

    const userData: IUserData = {
      id: managerId,
      role: Role.MANAGER,
      phone_2: manager.phone_2 || null,
      ...manager,
    };
    const userObject = User.create(userData);

    const createManager = await this.usersUseCase.createUser(userObject);

    return res.status(HttpStatus.CREATED).json({
      message: 'Gerente cadastrado com sucesso!',
      data: createManager,
    });
  }

  @Post('signin')
  @ApiOperation({ tags: ['Autenticação'], summary: 'Login' })
  async signIn(
    @Body()
    body: {
      email: string;
      password: string;
    },
    @Res() res: Response,
  ): Promise<Response> {
    const email = body.email;
    const password = body.password.toString();

    const findUser = await this.usersUseCase.findUserByEmail(email);
    if (!findUser) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Email ou senha incorretos 1!',
      });
    }

    const passwordMatched = await compareHash(password, findUser.password);
    if (passwordMatched === false) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Email ou senha incorretos 2!',
      });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: findUser.id,
      expiresIn,
    });

    return res.status(HttpStatus.OK).json({
      message: 'Login!',
      data: {
        user: findUser,
        token: token,
      },
    });
  }
}
