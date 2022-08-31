import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { ICompanyData } from '../../../core/entities/companies/company.data';
import { Company } from '../../../core/entities/companies/company.entity';
import { IUserData } from '../../../core/entities/users/user.data';
import { User } from '../../../core/entities/users/user.entity';
import { CompaniesUseCase } from '../../../core/usecases/companies.usecase';
import { Role } from '../../../shared/guards/role.enum';
import { CreateCompanyValidator } from '../validators/companies/create-company.validator';
import { FindCompanyValidator } from '../validators/companies/find-company.validator';
import { ListCompaniesValidator } from '../validators/companies/list-companies.validator';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesUseCase: CompaniesUseCase) {}

  @Get()
  @ApiQuery({
    name: 'cnpj',
    required: false,
    type: String,
  })
  @ApiOperation({ tags: ['Lojas'], summary: 'Lista lojas' })
  async listCompanies(
    @Query() query: ListCompaniesValidator,
    @Res() res: Response,
  ): Promise<Response> {
    let cnpj: string | undefined = query.cnpj || undefined;

    if (cnpj) {
      cnpj = cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      );
    }

    let companies = await this.companiesUseCase.listCompanies(cnpj);
    if (cnpj && companies.length > 0) {
      const user = await this.companiesUseCase.findUserByIdByCompany(
        companies[0]['shopmanid'],
      );
      const company = { ...companies[0], shopman: user };
      delete company['shopmanid'];
      companies = [company];
    }

    return res.status(HttpStatus.OK).json({
      message: 'Lojas listadas com sucesso!',
      data: companies,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
  })
  @ApiOperation({ tags: ['Lojas'], summary: 'Encontra loja' })
  async findCompany(
    @Param() params: FindCompanyValidator,
    @Res() res: Response,
  ): Promise<Response> {
    const { id } = params;

    const company = await this.companiesUseCase.findCompanyById(id);

    if (!company) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Loja não encontrada',
        data: company,
      });
    }

    return res.status(HttpStatus.OK).json({
      message: 'Loja encontrada com sucesso!',
      data: company,
    });
  }

  @Post()
  @ApiOperation({ tags: ['Lojas'], summary: 'Cria loja' })
  async createCompany(
    @Body() body: CreateCompanyValidator,
    @Res() res: Response,
  ): Promise<Response> {
    const { shopman, ...company } = body;
    const companyId = uuid();
    const shopmanId = uuid();
    const shopmanRole = Role.SHOPMAN;

    const cnpjFormatted = company.cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
    const findCompany = await this.companiesUseCase.listCompanies(
      cnpjFormatted,
    );
    if (findCompany.length > 0) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        message: 'CNPJ já foi cadastrado na plataforma!',
      });
    }

    const shopmanData: IUserData = {
      id: shopmanId,
      role: shopmanRole,
      password: null,
      phone_2: shopman.phone_2 || null,
      ...shopman,
    };
    const shopmanObject = User.create(shopmanData);

    const companyData: ICompanyData = {
      id: companyId,
      shopmanId: shopmanObject.toPlain().id,
      ...company,
      cnpj: cnpjFormatted,
    };
    const companyObject = Company.create(
      companyData,
      shopmanObject.toPlain().id,
    );

    const createdCompany = await this.companiesUseCase.createCompany(
      companyObject,
      shopmanObject,
    );

    return res.status(HttpStatus.CREATED).json({
      message: 'Loja criada com sucesso!',
      data: createdCompany,
    });
  }
}
