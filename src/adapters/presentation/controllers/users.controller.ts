import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UsersUseCase } from 'src/core/usecases/user.usecase';
import { CreateUserValidator } from '../validators/users/create-user.validator';
import { IUserData } from 'src/core/entities/users/user.data';
import { User } from 'src/core/entities/users/user.entity';
import { FindUserValidator } from '../validators/users/find-user.validator';
import { createHash } from 'src/shared/helpers';

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

    user.password = await createHash(user.password);

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

  // @Put(':id')
  // @ApiOperation({ tags: ['Usuários'], summary: 'Atualiza usuário' })
  // updateUser(@Res() res: Response): Response {
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Usuário atualizado com sucesso!',
  //   });
  // }

  // @Delete(':id')
  // @ApiOperation({ tags: ['Usuários'], summary: 'Remove usuário' })
  // removeUser(@Res() res: Response): Response {
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Usuário removido com sucesso!',
  //   });
  // }
}
