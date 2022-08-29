import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UsersUseCase } from 'src/core/usecases/user.usecase';
import { createHash } from 'src/shared/helpers';
import { IUserData } from 'src/core/entities/users/user.data';
import { Role } from 'src/shared/guards/role.enum';
import { User } from 'src/core/entities/users/user.entity';
import { CreateManagerValidator } from '../validators/users/create-manager.validator';

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

    manager.password = await createHash(manager.password);

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
  signIn(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Login!',
    });
  }
}
