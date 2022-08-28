import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  @Get()
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles(Role.ADMIN)
  // @ApiBearerAuth()
  @ApiOperation({ tags: ['Usuários'], summary: 'Lista usuários' })
  listUsers(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'List Users!',
    });
  }

  @Get(':id')
  @ApiOperation({ tags: ['Usuários'], summary: 'Encontra usuário' })
  findUser(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Find User!',
    });
  }

  /**
   * TODO - Criar outra rota para cadastro
   */
  @Post()
  @ApiOperation({ tags: ['Usuários'], summary: 'Cria usuário' })
  createUser(@Res() res: Response): Response {
    return res.status(HttpStatus.CREATED).json({
      message: 'Create User!',
    });
  }

  @Put(':id')
  @ApiOperation({ tags: ['Usuários'], summary: 'Atualiza usuário' })
  updateUser(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Update User!',
    });
  }

  @Delete(':id')
  @ApiOperation({ tags: ['Usuários'], summary: 'Remove usuário' })
  removeUser(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Remove User!',
    });
  }
}
