import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UsersUseCase } from '../../../core/usecases/user.usecase';
import { CreateUserValidator } from '../validators/users/create-user.validator';
import { IUserData } from '../../../core/entities/users/user.data';
import { User } from '../../../core/entities/users/user.entity';
import { FindUserValidator } from '../validators/users/find-user.validator';
import { createHash } from '../../../shared/helpers';
import { Role } from '../../../shared/guards/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersUseCase: UsersUseCase) {}

  @Get()
  @ApiOperation({ tags: ['Usuários'], summary: 'Lista usuários' })
  async listUsers(@Res() res: Response): Promise<Response> {
    const users = await this.usersUseCase.listUsers();

    return res.status(HttpStatus.OK).json({
      message: 'Usuários listados com sucesso!',
      data: users,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiOperation({ tags: ['Usuários'], summary: 'Encontra usuário' })
  async findUser(
    @Param() params: FindUserValidator,
    @Res() res: Response,
  ): Promise<Response> {
    const { id } = params;
    const user = await this.usersUseCase.findUserById(id);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Usuário não encontrado',
        data: user,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Usuário encontrado com sucesso!',
      data: user,
    });
  }

  @Post()
  @ApiOperation({ tags: ['Usuários'], summary: 'Cria usuário' })
  async createUser(
    @Body() body: CreateUserValidator,
    @Res() res: Response,
  ): Promise<Response> {
    const user = body;
    const userId = uuid();

    const findUser = await this.usersUseCase.findUserByEmail(user.email);
    if (findUser) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'Usuário já foi cadastrado na plataforma!',
      });
    }

    if (user.role === Role.SHOPMAN || !user.password) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message:
          'Não é permitido criar lojista que não estiver associado à loja!',
      });
    }

    user.password = await createHash(user.password.toString());
    const userData: IUserData = {
      id: userId,
      phone_2: user.phone_2 || null,
      ...user,
    };
    const userObject = User.create(userData);

    const createUser = await this.usersUseCase.createUser(userObject);

    return res.status(HttpStatus.CREATED).json({
      message: 'Usuário criado com sucesso!',
      data: createUser,
    });
  }
}
