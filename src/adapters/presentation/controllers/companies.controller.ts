import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { ListCompaniesValidator } from '../validators/companies/list-companies.validator';

@Controller('companies')
export class CompaniesController {
  @Get()
  @ApiQuery({
    name: 'cnpj',
    required: false,
    type: String,
  })
  @ApiOperation({ tags: ['Lojas'], summary: 'Lista lojas' })
  listCompanies(
    @Query() query: ListCompaniesValidator,
    @Res() res: Response,
  ): Response {
    const { cnpj } = query;
    return res.status(HttpStatus.OK).json({
      message: 'List Companies!',
    });
  }

  @Get(':id')
  @ApiOperation({ tags: ['Lojas'], summary: 'Encontra loja' })
  findCompany(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Find Company!',
    });
  }

  @Post()
  @ApiOperation({ tags: ['Lojas'], summary: 'Cria loja' })
  createCompany(@Res() res: Response): Response {
    return res.status(HttpStatus.CREATED).json({
      message: 'Create Company!',
    });
  }

  @Put(':id')
  @ApiOperation({ tags: ['Lojas'], summary: 'Atualiza loja' })
  updateCompany(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Update Company!',
    });
  }

  @Delete(':id')
  @ApiOperation({ tags: ['Lojas'], summary: 'Remove loja' })
  removeCompany(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).json({
      message: 'Remove Company!',
    });
  }
}
